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
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Donor
        const upload = new Upload(object)
        upload.save((err, upload) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly uploaded file
            else {
                resolve(upload); 
            }
        });
    });
}

