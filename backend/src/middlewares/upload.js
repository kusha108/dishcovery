const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

/* ===============================
   ENSURE UPLOAD FOLDER EXISTS
   (POINT TO ROOT /uploads)
================================ */

const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ===============================
   STORAGE CONFIG
================================ */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const uniqueName =
      crypto.randomBytes(16).toString("hex") +
      "-" +
      Date.now() +
      ext;

    cb(null, uniqueName);
  },
});

/* ===============================
   FILE FILTER
================================ */

const fileFilter = (req, file, cb) => {
  const allowedMime = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (!allowedMime.includes(file.mimetype)) {
    return cb(
      new Error("Only JPG, PNG, WEBP images allowed"),
      false
    );
  }

  cb(null, true);
};

/* ===============================
   MULTER CONFIG
================================ */

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

module.exports = upload;
