
import multer from 'multer';
import multerS3 from 'multer-s3';
const { S3Client } = require("@aws-sdk/client-s3");

const { bucket, accessKeyId, secretAccessKey } = process.env;



export const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    region: "us-east-1"
})

export const upload = multer({
    storage: multerS3({
        bucket,
        s3,


        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            console.log('file', file)
            if (!file) throw new Error('File not found')
            cb(null, `public/${Date.now().toString()}-${file.originalname}`);
        }
    })
})