const { Donor } = require('../models/index_mdl').models;

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Donor.findOne(query, (err, donor) => {
            if (err) { reject(err); }
            resolve(donor);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Donor.find(query, (err, donor) => {
            if (err) { reject(err); }
            resolve(donor);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Donor.find((err,donor) => {
            if(err) {reject(err); }
            resolve(donor)
        })
    });
}
