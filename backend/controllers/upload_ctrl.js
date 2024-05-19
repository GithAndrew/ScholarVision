const { Readable } = require('stream');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const Upload = require('../handlers/upload_hndlr');

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = new GridFSBucket(conn.db, { bucketName: 'uploads', chunkSizeBytes: 1024*1024 });
});

exports.uploadImage = async (req, res) => {
    try {
        const file = req.files.image;
        if (!file) {
            return res.status(400).send({ message: "Please upload an image" });
        }

        const randId = crypto.randomBytes(16).toString('hex');

        const readableStream = new Readable();
        readableStream.push(req.body.fileData);
        readableStream.push(null);

        const uploadStream = gfs.openUploadStream(
            randId, 
            { metadata: { contentType: file.mimetype } }
        );

        readableStream.pipe(uploadStream);

        console.log(req.body)
        
        uploadStream.on('finish', async (fileInfo) => {
            await Upload.create({
                upload_id: fileInfo._id,
                contentType: file.headers['content-type'],
                path: fileInfo.filename
            });
            const extension = file.headers['content-type'].slice(6);
            console.log(`${fileInfo._id}.${extension}`)
            return res.status(200).send({ success: true, id: `${fileInfo._id}.${extension}` });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Server side error" });
    }
};

exports.renderImage = async (req, res) => {
    const upload_id = req.params.id.split(".")[0];
    try {
        const objectId = mongoose.Types.ObjectId(upload_id);
        const downloadStream = gfs.openDownloadStream(objectId)
        downloadStream.pipe(res);
    } catch (err) {
        console.error(`Error searching for upload in the DB: ${err}`);
        return res.status(500).send({ message: "Error searching for uploads" });
    }
};
