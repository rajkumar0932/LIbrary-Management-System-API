import multer from "multer";
import path from "path";
import fs from "fs";

// build a multer uploader for a given folder
const makeUpload = (subdir, prefix) => {
  const dir = `uploads/${subdir}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, prefix + "-" + Date.now() + "-" + Math.round(Math.random() * 1e9) + ext);
    },
  });

  // only images allowed
  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG, PNG and WEBP images are allowed"));
    }
  };

  return multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });
};

const coverUpload = makeUpload("covers", "cover");
const profileUpload = makeUpload("profiles", "profile");

// wrap it so multer errors are sent back as 400
const handle = (mw) => (req, res, next) => {
  mw(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export const uploadCover = handle(coverUpload.single("cover"));
export const uploadProfile = handle(profileUpload.single("profilePicture"));
