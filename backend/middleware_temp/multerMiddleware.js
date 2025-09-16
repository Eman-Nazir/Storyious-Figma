import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const Upload = (folderName = "general") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName,
      allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov", "avi"],
      public_id: (req, file) => file.originalname.split(".")[0],
      resource_type: (req, file) => {
        const ext = file.originalname.split(".").pop().toLowerCase();
        if (["mp4", "mov", "avi"].includes(ext)) return "video";
        return "image";
      },
    },
  });

  return multer({ storage });
};

export default Upload;
