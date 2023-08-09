const multer = require("multer");
const createHttpError = require("http-errors")

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

  if(MIMETYPES.some((mimetype) => mimetype === file.mimetype)) {
    return cb(null, true);
  }

  cb(createHttpError(415, "Wrong file type. Support only png/webp/gif/jpeg files"));
};

const upload = multer({ storage, fileFilter });
module.exports.uploadHeroFile = upload.single("heroPhoto");
