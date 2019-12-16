const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, './public')},
    filename: (req, file, cb) => cb(null, Date.now() + file.originalname) 
})

function fileFilter(req, file, cb) {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        return cb(null, true)
    }
    cb(new Error('File must be PNG or JPG'))
}

const limits = { fileSize: 102400}

const upload = multer({storage, limits, fileFilter})

module.exports = upload