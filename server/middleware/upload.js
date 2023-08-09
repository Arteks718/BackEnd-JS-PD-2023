const multer = require("multer");
const createHttpError = require("http-errors")
const path = require("path");
const { STATIC_FOLDER,IMAGES_FOLDER } = require('../constants')


const storage = multer.diskStorage({
  // save path
  destination: (req, file, cb) => {
    cb(null, path.join(STATIC_FOLDER, IMAGES_FOLDER));
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
