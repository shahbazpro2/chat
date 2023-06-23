
import { DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
const { S3Client } = require("@aws-sdk/client-s3");

const { bucket, accessKeyId, secretAccessKey } = process.env;

console.log(bucket, accessKeyId, secretAccessKey)


const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    region: "us-east-1"
})

const upload = multer({
    storage: multerS3({
        bucket,
        s3,


        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `public/${Date.now().toString()}-${file.originalname}`);
        }
    })
})


export const config = {
    api: {
        bodyParser: false,
    },
};






export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            //read file from request
            upload.single('file')(req, res, function (err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                return res.status(200).json({ message: 'File uploaded successfully', url: req.file.location });
            });
            break;
        case 'GET':

            const command = new ListObjectsV2Command({
                Bucket: "prommuni-test-fiverr",
                // The default and maximum number of keys returned is 1000. This limits it to
                // one for demonstration purposes.
                MaxKeys: 1,
            });

            try {
                let isTruncated = true;

                console.log("Your bucket contains the following objects:\n")
                let contents = "";

                while (isTruncated) {
                    const { Contents, IsTruncated, NextContinuationToken } = await s3.send(command);
                    const contentsList = Contents?.map((c) => ` • ${c.Key}`).join("\n");
                    if (contentsList) {
                        contents += contentsList + "\n";
                        command.input.ContinuationToken = NextContinuationToken;
                    }
                    isTruncated = IsTruncated;
                }
                return res.status(200).json(contents);

            } catch (err) {
                console.error(err);
            }
            break;
        case 'DELETE':
            //get paramas
            const { name } = req.query;
            console.log('name', name)
            const params = {
                Bucket: bucket,
                Key: name
            };
            try {
                await s3.send(new DeleteObjectCommand(params));
                return res.status(200).json({ message: 'File deleted successfully' });
            } catch (err) {
                console.error(err);
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};



