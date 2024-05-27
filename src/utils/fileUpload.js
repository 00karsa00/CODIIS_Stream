import multer from 'multer';
import path from 'path';

import fs from 'fs';

// Define the upload directory
const uploadDir = './public/uploads';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null,uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 50000000 }, 
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('videoFile');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /mp4|avi|mkv|mov/;;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}



export const fileUpload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log("fileUpload => ",err)
            return next({ status: 400, message: "file not upload" });
        } else {
            console.log("req.file => ",req.file)
            if (req.file == undefined) {
                return next({ status: 400, message: "No File Selected!" });
            } else {
                req.body.fileName = req.file.filename;
                return next();
            }
        }
    });
};
