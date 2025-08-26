import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const filePath = path.join(uploadDir, file.originalname);

    if (fs.existsSync(filePath)) {
      const randomStr = Math.floor(Math.random() * 10000);
      const newName = randomStr + "-" + file.originalname;
      cb(null, newName);
    } else {
      cb(null, file.originalname);
    }
  }
});

const upload = (fields) => multer({ storage }).fields(fields);

export default upload;
