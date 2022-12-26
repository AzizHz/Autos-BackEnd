const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../crud-app/server/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`);

    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}


var upload = multer({ storage, fileFilter });

module.exports = upload;