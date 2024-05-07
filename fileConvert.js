const express = require('express');
const multer = require('multer');
const cors = require('cors')
const sharp = require('sharp');
const app = express();
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true }))
const corsOptions = {
    origin: 'http://65.0.108.107',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
    optionsSuccessStatus: 200  
};

app.use(cors(corsOptions));
const port = 3001;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/convert-tiff', upload.single('file'), (req, res) => {
    // console.log('req.file',req.file);
    sharp(req.file.buffer)
        .jpeg({ quality: 90 })
        .resize({
            width: 2000,
            height: 2000,
            fit: sharp.fit.cover, 
            withoutEnlargement: true 
        })
        .toBuffer()
        .then(data => {
            res.type('jpeg').send(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error processing TIFF file");
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
