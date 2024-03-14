const { Donor } = require('../models/index_mdl').models;

exports.getOne = (query) => {
    return new Promise((resolve, reject) => {
        Donor.findOne(query, (err, donor) => {
            if(err) { reject(err); }
            resolve(donor);
        });
    });
}

exports.getMany = (query, order) => {
    return new Promise((resolve, reject) => {
        Donor.find(query, (err, donor) => {
            if(err) { reject(err); }
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

exports.create = (object) => {
    return new Promise((resolve,reject) => {
        const newDonor = new Donor(object);
        newDonor.save((err, donor) => {
            if(err) { reject(err); }
            else {
                resolve(donor); 
            }
        });
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        Donor.findOne({ _id: object.id }, (err, donor) => {
            if(err) { reject(err); }
            donor.last_name = object.last_name
            donor.first_name = object.first_name
            donor.middle_name = object.middle_name
            donor.birthday = object.birthday
            donor.birthplace = object.birthplace
            donor.suffix = object.suffix
            donor.citizenship = object.citizenship
            donor.mobile_no = object.mobile_no
            donor.sex = object.sex
            donor.email = object.email
            donor.statement = object.statement
            donor.upload_id = object.upload_id
            donor.newFields = object.newFields

            donor.save((err, donor) => {
                if(err) { reject(err); }
                resolve(donor);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        Donor.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}

exports.addfield = (object) =>{
    return new Promise((resolve, reject) => {
        Donor.findOne({ _id: object.id }, (err, donor) => {
            if(err) { reject(err); }
            donor.newFields = object.newFields
            
            donor.save((err, donor) => {
                if(err) { reject(err); }
                resolve(donor);
            });
        });
    });
}