const { Scholarship } = require('../models/index').models;

// create a new Scholarship
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Scholarship
        const newScholarship = new Scholarship(object);
        newScholarship.save((err, scholarship) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created scholarship
            else {
                resolve(scholarship); 
            }
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Scholarship.findOne(query, (err, scholarship) => {
            if (err) { reject(err); }
            resolve(scholarship);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Scholarship.find(query, (err, scholarship) => {
            if (err) { reject(err); }
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

// 1 if ascending, -1 if descending
exports.getAllSorted = (sort) => {
    return new Promise((resolve, reject) => {
        Scholarship.find((err,scholarship) => {
            if(err) {reject(err); }
            resolve(scholarship)
        })
        .sort({ grant: sort })
    });
}


exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Scholarship.findOne({ _id: object._id }, (err, scholarship) => {
            if (err) { reject(err); }
            scholarship.donor = object.donor
            scholarship.grant = object.grant
            scholarship.details = object.details
            scholarship.scholarshipname = object.scholarshipname
            scholarship.year = object.year
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
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Scholarship.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}