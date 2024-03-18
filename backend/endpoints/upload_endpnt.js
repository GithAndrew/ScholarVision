const { UploadController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Upload = Router();

Upload.post('/', UploadController.uploadImage);
Upload.get('/:id', UploadController.renderImage);

module.exports = Upload;
