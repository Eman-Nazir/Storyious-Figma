import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const Upload = (folderName = "general") => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder: folderName, 
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: (req, file) => file.originalname.split(".")[0], 
    },
  });

  return multer({ storage });
};

export default Upload;
