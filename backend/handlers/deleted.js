const { Deleted } = require('../models/index').models;

exports.create = (type, data) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Donor
        const object = {
            object_type: type,
            object: data
        }
        const toDelete = new Deleted(object)
        toDelete.save((err, deleted) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created donor
            else {
                resolve(deleted); 
            }
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Deleted.find((err,deleted) => {
            if(err) {reject(err); }
            resolve(deleted)
        })
    });
}
