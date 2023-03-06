const multer = require('multer');
const path = require('path');

const storeImageProduct = multer.diskStorage({
    destination : function (req,file, callback) {
        callback(null, 'public/image/products/' )
    },
    filename : function (req, file, callback) {
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});



const uploadImageProduct = multer({
    storage : storeImageProduct,
    fileFilter : function (req,file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidatorError = "Solo se permiten imágenes JPG | JPEG | PNG | GIF | WEBP"
            return callback(null, false, req.fileValidatorError)
        }

        callback(null, true)
    }
});


module.exports = {
    uploadImageProduct,
}