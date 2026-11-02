import multer from "multer";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { fileTypeFromBuffer } from "file-type";
import CFB from "cfb";
import cloudinary from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const verifiedTypes = new WeakMap();

const formats = {
  ".jpg": { ext: "jpg", kind: "image" },
  ".jpeg": { ext: "jpg", kind: "image" },
  ".png": { ext: "png", kind: "image" },
  ".gif": { ext: "gif", kind: "image" },
  ".webp": { ext: "webp", kind: "image" },
  ".bmp": { ext: "bmp", kind: "image" },

  ".mp4": { ext: "mp4", kind: "video" },
  ".mov": { ext: "mov", kind: "video" },
  ".webm": { ext: "webm", kind: "video" },
  ".avi": { ext: "avi", kind: "video" },
  ".mkv": { ext: "mkv", kind: "video" },

  ".pdf": { ext: "pdf", kind: "raw" },
  ".docx": { ext: "docx", kind: "raw" },
  ".doc": { ext: "doc", kind: "raw" },
};

const getFiles = (req) => {
  if (req.file) {
    return [req.file];
  }

  if (Array.isArray(req.files)) {
    return req.files;
  }

  return Object.values(req.files || {}).flat();
};

const allowedKinds = (folder, field) => {
  if (folder === "submissions") {
    return ["image", "video", "raw"];
  }

  if (folder === "stories" && field === "videoFile") {
    return ["video"];
  }

  if (folder === "stories" && field === "file") {
    return ["image", "video"];
  }

  return ["image"];
};

const getFormat = (file, folder) => {
  if (
    typeof file.originalname !== "string" ||
    file.originalname.length > 200
  ) {
    throw new ApiError(400, "Invalid file name");
  }

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const format = formats[extension];

  if (
    !format ||
    !allowedKinds(folder, file.fieldname).includes(format.kind)
  ) {
    throw new ApiError(
      400,
      "This file type is not allowed for this field"
    );
  }

  return format;
};

const validateFile = async (file, folder) => {
  if (verifiedTypes.has(file)) {
    return verifiedTypes.get(file);
  }

  const format = getFormat(file, folder);

  if (
    !Buffer.isBuffer(file.buffer) ||
    file.buffer.length === 0
  ) {
    throw new ApiError(
      400,
      "Empty or invalid uploaded file"
    );
  }

  if (file.buffer.length > MAX_FILE_SIZE) {
    throw new ApiError(
      413,
      "Each file must be 5 MB or smaller"
    );
  }

  try {
    if (format.ext === "doc") {
      const header = Buffer.from(
        "d0cf11e0a1b11ae1",
        "hex"
      );

      if (
        file.buffer.length < 512 ||
        !file.buffer.subarray(0, 8).equals(header)
      ) {
        throw new Error("Invalid Word document");
      }

      const container = CFB.read(file.buffer, {
        type: "buffer",
      });

      const word = CFB.find(container, "WordDocument");

      if (
        !word?.content ||
        word.content.length < 2 ||
        Buffer.from(word.content).readUInt16LE(0) !== 0xa5ec
      ) {
        throw new Error("Invalid Word document");
      }
    } else {
      const detected = await fileTypeFromBuffer(file.buffer);

      if (!detected || detected.ext !== format.ext) {
        throw new Error(
          "File contents do not match the extension"
        );
      }
    }
  } catch {
    throw new ApiError(
      400,
      "File contents do not match an allowed file type"
    );
  }

  verifiedTypes.set(file, format);
  return format;
};

export const cleanupUploadedFiles = async (req) => {
  const results = await Promise.allSettled(
    getFiles(req)
      .filter((file) => file.cloudinaryPublicId)
      .map(async (file) => {
        await cloudinary.uploader.destroy(
          file.cloudinaryPublicId,
          {
            resource_type: file.cloudinaryResourceType,
            invalidate: true,
          }
        );

        delete file.cloudinaryPublicId;
        delete file.cloudinaryResourceType;
        delete file.path;
      })
  );

  if (
    results.some((result) => result.status === "rejected")
  ) {
    throw new Error(
      "Could not clean up an uploaded file"
    );
  }
};

export const uploadBufferedFiles = async (req, folder) => {
  const files = getFiles(req);

  // Validate every file before uploading any of them.
  const types = await Promise.all(
    files.map((file) => validateFile(file, folder))
  );

  try {
    for (const [index, file] of files.entries()) {
      if (file.path && !file.buffer) {
        continue;
      }

      const format = types[index];

      const publicId =
        randomUUID() +
        (format.kind === "raw" ? "." + format.ext : "");

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
            public_id: publicId,
            resource_type: format.kind,
            overwrite: false,
            timeout: 60000,
          },
          (error, uploaded) => {
            if (error) {
              reject(
                new ApiError(
                  502,
                  "File upload failed. Please try again."
                )
              );
            } else {
              resolve(uploaded);
            }
          }
        );

        stream.on("error", () => {
          reject(
            new ApiError(
              502,
              "File upload failed. Please try again."
            )
          );
        });

        stream.end(file.buffer);
      });

      if (result?.public_id) {
        file.cloudinaryPublicId = result.public_id;
        file.cloudinaryResourceType = format.kind;
      }

      if (!result?.secure_url || !result?.public_id) {
        throw new ApiError(
          502,
          "File upload did not return a URL"
        );
      }

      file.path = result.secure_url;
      file.filename = result.public_id;

      delete file.buffer;
    }
  } catch (error) {
    try {
      await cleanupUploadedFiles(req);
    } catch {
      console.error(
        "Failed to clean up an incomplete upload"
      );
    }

    throw error;
  }
};

const uploadError = (error) => {
  if (!(error instanceof multer.MulterError)) {
    return error;
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return new ApiError(
      413,
      "Each file must be 5 MB or smaller"
    );
  }

  if (error.code === "LIMIT_UNEXPECTED_FILE") {
    return new ApiError(
      400,
      "Unexpected file field or too many files"
    );
  }

  return new ApiError(
    413,
    "The uploaded form exceeds its size or field limits"
  );
};

const Upload = (
  folder = "general",
  { deferUpload = false } = {}
) => {
  const maxFiles =
    folder === "blogs"
      ? 10
      : folder === "stories"
      ? 2
      : 1;

  const maxFields = folder === "submissions" ? 16 : 30;

  const parser = multer({
    storage: multer.memoryStorage(),

    limits: {
      fileSize: MAX_FILE_SIZE,
      files: maxFiles,
      fields: maxFields,
      parts: maxFields + maxFiles,
      fieldNameSize: 100,
      fieldSize:
        folder === "submissions"
          ? 32 * 1024
          : 256 * 1024,
    },

    fileFilter(req, file, callback) {
      try {
        getFormat(file, folder);
        callback(null, true);
      } catch (error) {
        callback(error);
      }
    },
  });

  const wrap = (middleware) => (req, res, next) => {
    middleware(req, res, (error) => {
      if (error) {
        return next(uploadError(error));
      }

      Promise.resolve()
        .then(async () => {
          await Promise.all(
            getFiles(req).map((file) =>
              validateFile(file, folder)
            )
          );

          if (!deferUpload) {
            await uploadBufferedFiles(req, folder);
          }
        })
        .then(() => next(), next);
    });
  };

  return {
    single: (field) =>
      wrap(parser.single(field)),

    array: (field, count = maxFiles) =>
      wrap(
        parser.array(
          field,
          Math.min(count, maxFiles)
        )
      ),

    fields: (fields) =>
      wrap(parser.fields(fields)),
  };
};

export default Upload;