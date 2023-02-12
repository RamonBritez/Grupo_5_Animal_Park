const multer = require('multer');
const path = require('path');

const storeImageProduct = multer.diskStorage({
    destination : function (req,file, callback) {
        callback(null, 'public/image/products/gatos' )
    },
    filename : function (req, file, callback) {
        callback(null, `${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});

const uploadImageProduct = multer({
    storage : storeImageProduct
});

module.exports = {
    uploadImageProduct
}