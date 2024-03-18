const { Upload } = require('../models/index_mdl').models;

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Upload.findOne(query, (err, imgdata) => {
            if(err) { reject(err); }
            resolve(imgdata);
        });
    });
}

exports.create = (object) => {
    return new Promise((resolve,reject) => {
        const upload = new Upload(object)
        upload.save((err, upload) => {
            if(err) { reject(err); }
            else { resolve(upload); }
        });
    });
}

