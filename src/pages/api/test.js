import multerMiddleware from '@backend/utils/multer';
import S3 from 'aws-sdk/clients/s3';



/* AWS.config.update({
    accessKeyId: 'AKIAXSRZMZZFQA7AGPZB',
    secretAccessKey: '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',
    region: 's3://prommuni-test-fiverr/',
}) */

//make api upload and get all files from s3 bucket using latest v3

const s3 = new S3({
    accessKeyId: 'AKIAXSRZMZZFQA7AGPZB',
    secretAccessKey: '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',
    region: 'us-east-1',
    signatureVersion: 'v4',
})


export const config = {
    api: {
        bodyParser: {
            sizeLimit: '8mb'
        },
    },
};






export default async function handler(req, res) {
    switch (req.method) {
        case 'POST':
            //read file from request



            const params = {
                Bucket: 'prommuni-test-fiverr',
                Key: 'test',
                ContentType: 'png',
                Body: req.body,
                ACL: 'public-read'
            };
            s3.upload(params, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                return res.status(200).json(data);
            });

            /*  const fileParam = {
                 Bucket: 'test',
                 Key: name,
                 ContentType: type,
                 Expires: 600,
                 ACL: 'public-read'
             }
             const url = await s3.getSignedUrlPromise('putObject', fileParam);
             res.status(200).json({ url }); */
            break;
        case 'GET':

            s3.listObjectsV2(params, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json(err);
                }
                return res.status(200).json(data.Contents);
            }
            );
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};



