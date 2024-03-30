import multer from "multer";
import path from "path";
const destination = path.resolve("tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 250 * 250 * 5,
};

const upload = multer({
  storage,
  limits,
});

export default upload;