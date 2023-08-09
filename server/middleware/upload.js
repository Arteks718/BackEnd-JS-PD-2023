const multer = require("multer");

const storage = multer.diskStorage({
  // save path
  destination: (req, file, cb) => {
    cb(null, "public/images/");
  },
  // new file name
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  const MIMETYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  cb(
    null,
    MIMETYPES.some((mimetype) => mimetype === file.mimetype)
  );
};

const upload = multer({ storage, fileFilter });
module.exports.uploadHeroFile = upload.single("heroPhoto");
