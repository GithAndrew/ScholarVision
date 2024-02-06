const { UploadController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const Upload = Router();

// access controllers

Upload.post('/', UploadController.uploadImage);
Upload.get('/:id', UploadController.renderImage);


module.exports = Upload;