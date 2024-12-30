import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const destinationPath = "./uploads/";
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user_id}_${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    if (extname !== ".txt") {
      return cb(new Error("Only .txt files are allowed") as any, false);
    }
    cb(null, true);
  },
});
