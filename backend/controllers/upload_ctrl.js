const { Readable } = require('stream');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const Upload = require('../handlers/upload_hndlr');

const conn = mongoose.connection;
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

exports.uploadImage = async (req, res) => {
    try {
        const file = req.files.image;
        if (!file) {
            return res.status(400).send({ message: "Please upload an image" });
        }

        const randId = crypto.randomBytes(16).toString('hex');

        const readableStream = new Readable();
        readableStream.push(file.data);
        readableStream.push(null);

        const writeStream = gfs.createWriteStream({
            filename: randId,
            metadata: { contentType: file.mimetype }
        });

        readableStream.pipe(writeStream);

        writeStream.on('close', async (fileInfo) => {
            const extension = fileInfo.filename.split('.').pop();
            await Upload.create({
                upload_id: fileInfo._id,
                contentType: fileInfo.metadata.contentType,
                path: fileInfo.filename,
                extension: extension
            });
            return res.status(200).send({ success: true, id: `${fileInfo._id}.${extension}` });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Server side error" });
    }
};

exports.renderImage = async (req, res) => {
    const upload_id = req.params.id;
    try {
        const fileInfo = await gfs.files.findOne({ _id: upload_id });
        if (!fileInfo) {
            console.log("Upload not found");
            return res.status(404).send({ message: "Upload not found" });
        }

        const readStream = gfs.createReadStream(fileInfo.filename);
        readStream.pipe(res);
    } catch (err) {
        console.error(`Error searching for upload in the DB: ${err}`);
        return res.status(500).send({ message: "Error searching for uploads" });
    }
};
