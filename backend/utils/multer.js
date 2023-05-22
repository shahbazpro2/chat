import multer from 'multer';

// Configure Multer storage
const storage = multer.memoryStorage();

// Create the Multer upload instance
const upload = multer({ storage });

export default function multerMiddleware(req, res, next) {
    upload.single('file')(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            // Handle Multer-specific errors
            console.log('err', error)
            return res.status(400).json({ error: error.message });
        } else if (error) {
            // Handle other errors
            return res.status(500).json({ error: 'An unexpected error occurred' });
        }
        next();
    });
}
