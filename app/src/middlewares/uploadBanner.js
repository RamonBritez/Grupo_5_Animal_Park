const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/image/carrousel/'))
    },
    filename: (req, file, callback) => {
       
       // let ext = path.extname(file.originalname)

        callback(null, `${req.params.id}.jpg`)
    }
});

module.exports = multer({storage});