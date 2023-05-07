const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/image/users/'))
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}_avatar_${path.extname(file.originalname)}`)
    }
})

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        req.fileValidationError = "Sólo imágenes (.jpg, .jpeg, .png, .gif)";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}


module.exports = multer({storage, fileFilter});
