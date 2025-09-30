import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const memoryStorage = multer.memoryStorage();

const Upload = (folderName = "general") => {
  try {
    const storage = new CloudinaryStorage({
      cloudinary,
      params: async (req, file) => {
        const ext = file.originalname.split(".").pop().toLowerCase();
        
        let resourceType = "auto";
        if (["jpg", "jpeg", "png", "webp", "gif", "bmp"].includes(ext)) {
          resourceType = "image";
        } else if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext)) {
          resourceType = "video";
        } else {
          resourceType = "raw"; 
        }

        return {
          folder: folderName,
          resource_type: resourceType,
          public_id: `${file.originalname.split(".")[0]}-${Date.now()}`,
        };
      },
    });

    return multer({
      storage,
      fileFilter: (req, file, cb) => {
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, 
      },
    });
  } catch (error) {
    console.error("Cloudinary storage failed, using memory storage:", error);
    return multer({
      storage: memoryStorage,
      limits: {
        fileSize: 5 * 1024 * 1024,
      }
    });
  }
};

export default Upload;