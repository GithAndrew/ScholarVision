const { Donor } = require('../models/index').models;

// create a new Donor
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Donor
        const newDonor = new Donor(object);
        newDonor.save((err, donor) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created donor
            else {
                resolve(donor); 
            }
        });
    });
}

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

exports.getAllSorted = (query) => {
    return new Promise((resolve, reject) => {
        Donor.find((err,donor) => {
            if(err) {reject(err); }
            resolve(donor)
        })
        .sort(query)
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Donor.findOne({ _id: object.id }, (err, donor) => {
            if (err) { reject(err); }
            donor.last_name = object.last_name
            donor.first_name = object.first_name
            donor.middle_name = object.middle_name
            donor.birthday = object.birthday
            donor.birthplace = object.birthplace
            donor.suffix = object.suffix
            donor.address = object.address
            donor.citizenship = object.citizenship
            donor.mobile_no = object.mobile_no
            donor.sex = object.sex
            donor.email = object.email
            donor.statement = object.statement
            donor.upload_id = object.upload_id

            donor.save((err, donor) => {
                if(err) { reject(err); }
                resolve(donor);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Donor.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}