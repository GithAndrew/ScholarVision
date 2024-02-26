const { Scholarship } = require('../models/index_mdl').models;

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Scholarship.findOne(query, (err, scholarship) => {
            if(err) { reject(err); }
            resolve(scholarship);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Scholarship.find(query, (err, scholarship) => {
            if(err) { reject(err); }
            resolve(scholarship);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Scholarship.find((err,scholarship) => {
            if(err) {reject(err); }
            resolve(scholarship)
        })
    });
}

exports.getAllSorted = (sort) => {
    return new Promise((resolve, reject) => {
        Scholarship.find((err,scholarship) => {
            if(err) {reject(err); }
            resolve(scholarship)
        })
        .sort({ grant: sort })
    });
}

exports.create = (object) => {
    return new Promise((resolve,reject) => {
        const newScholarship = new Scholarship(object);
        newScholarship.save((err, scholarship) => {
            if(err) { reject(err); }
            else {
                resolve(scholarship); 
            }
        });
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        Scholarship.findOne({ _id: object._id }, (err, scholarship) => {
            if(err) { reject(err); }
            scholarship.donor = object.donor
            scholarship.grant = object.grant
            scholarship.details = object.details
            scholarship.scholarshipname = object.scholarshipname
            scholarship.year = object.year
            scholarship.acceptancedate = object.acceptancedate
            scholarship.donor_id = object.donor_id
            
            scholarship.save((err, scholarship) => {
                if(err) { reject(err); }
                resolve(scholarship);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        Scholarship.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}
