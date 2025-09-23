import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const Upload = (folderName = "general") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
      const ext = file.originalname.split(".").pop().toLowerCase();

      let resourceType = "image"; 
      if (["mp4", "mov", "avi"].includes(ext)) {
        resourceType = "video";
      } else if (["doc", "docx", "pdf", "txt"].includes(ext)) {
        resourceType = "raw";
      }

      return {
        folder: folderName,
        resource_type: resourceType,
        allowed_formats: [
          "jpg", "jpeg", "png", "webp",
          "mp4", "mov", "avi",
          "doc", "docx", "pdf", "txt"
        ],
        public_id: file.originalname.split(".")[0],
      };
    },
  });

  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedExts = [
        "jpg", "jpeg", "png", "webp",
        "mp4", "mov", "avi",
        "doc", "docx", "pdf", "txt"
      ];
      const ext = file.originalname.split(".").pop().toLowerCase();

      if (allowedExts.includes(ext)) {
        cb(null, true);
      } else {
        cb(new Error(`File type ".${ext}" is not allowed`));
      }
    },
  });
};

export default Upload;
