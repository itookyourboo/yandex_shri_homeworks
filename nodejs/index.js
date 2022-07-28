const express = require('express');
const multer = require('multer');
const {replaceBackground} = require('backrem');
const fs = require('fs');
const {resolve} = require('path');

const app = express();

const upload = multer({dest: 'jpeg/'});
const PORT = process.env.PORT || 8080;
const jpegs = {};

app.post('/upload', upload.single('image'), (req, res) => {
    const jpeg = jpegFromFile(req.file);
    jpegs[jpeg.id] = jpeg;
    res.send({id: jpeg.id});
});

app.get('/list', (req, res) => {
    res.json(Object.values(jpegs).map(toPublicJson));
});

app.get('/image/:id', (req, res) => {
    const id = req.params.id;
    if (!jpegs[id]) {
        res.sendStatus(404);
        return;
    }
    res.setHeader('Content-Type', jpegs[id].mimeType);
    const stream = fs.createReadStream(getLocalPath(jpegs[id].path));
    stream.pipe(res);
});

app.delete('/image/:id', (req, res) => {
    const id = req.params.id;
    if (!jpegs[id]) res.sendStatus(404);
    fs.unlink(getLocalPath(jpegs[id].path), () => {
        delete jpegs[id];
        res.json({id: id});
    });
});

app.get('/merge', (req, res) => {
    try {
        let {front, back, color, threshold} = req.query;
        color = color ? color.split(',').map(px => parseInt(px)) : [255, 255, 255];
        threshold = threshold ? parseInt(threshold) : 0;
        if (!front || !back || !jpegs[front] || !jpegs[back]) {
            res.sendStatus(404);
            return;
        }

        const backImage = fs.createReadStream(getLocalPath(jpegs[back].path));
        const frontImage = fs.createReadStream(getLocalPath(jpegs[front].path));
        res.setHeader('Content-Type', "image/jpeg");
        replaceBackground(frontImage, backImage, color, threshold)
            .then((stream) => stream.pipe(res));
    } catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});

app.listen(PORT, '127.0.0.1', 511, () => {
    console.log(`Server started on port ${PORT}`);
});

function jpegFromFile(file) {
    return {
        id: file.filename,
        uploadedAt: Date.now(),
        mimeType: file.mimetype,
        size: file.size,
        path: file.path
    };
}

function toPublicJson(jpeg) {
    return {
        id: jpeg.id,
        uploadedAt: jpeg.uploadedAt,
        size: jpeg.size
    };
}

function getLocalPath(jpegPath) {
    return resolve(__dirname, jpegPath);
}