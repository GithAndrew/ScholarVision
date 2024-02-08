const { Deleted } = require('../models/index_mdl').models;

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Deleted.find((err,deleted) => {
            if(err) {reject(err); }
            resolve(deleted)
        })
    });
}

exports.create = (type, data) => {
    return new Promise((resolve,reject) => {
        const object = {
            object_type: type,
            object: data
        }
        const toDelete = new Deleted(object)
        toDelete.save((err, deleted) => {
            if(err) { reject(err); }
            else {
                resolve(deleted); 
            }
        });
    });
}
