// eslint-disable-next-line strict
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now())
  }
});

const upload = multer({ storage: storage })
module.exports = upload;
