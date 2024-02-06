const { Applicant } = require('../models/index').models;

// create a new Applicant
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Applicant
        const newApplicant = new Applicant(object);
        newApplicant.save((err, applicant) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created applicant
            else {
                resolve(applicant); 
            }
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Applicant.findOne(query, (err, applicant) => {
            if (err) { reject(err); }
            resolve(applicant);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Applicant.find(query, (err, applicant) => {
            if (err) { reject(err); }
            resolve(applicant);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Applicant.find((err,applicant) => {
            if(err) {reject(err); }
            resolve(applicant)
        })
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Applicant.findOne({ _id: object.id }, (err, applicant) => {
            if (err) { reject(err); }
            applicant.last_name = object.last_name
            applicant.first_name = object.first_name
            applicant.middle_name = object.middle_name
            applicant.suffix = object.suffix
            applicant.student_no = object.student_no
            applicant.graduation_year = object.graduation_year
            applicant.mobile_no = object.mobile_no
            applicant.email = object.email
            applicant.birthday = object.birthday
            applicant.birthplace = object.birthplace
            applicant.sex = object.sex
            applicant.citizenship = object.citizenship
            applicant.address = object.address
            applicant.father_details = object.father_details
            applicant.mother_details = object.mother_details
            applicant.guardian_name = object.guardian_name
            applicant.guardian_contact = object.guardian_contact
            applicant.sibling_details = object.sibling_details
            applicant.educational_bg = object.educational_bg
            applicant.statement = object.statement
            applicant.applicant_link = object.applicant_link
            applicant.upload_id = object.upload_id
            
            applicant.save((err, applicant) => {
                if(err) { reject(err); }
                resolve(applicant);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Applicant.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}