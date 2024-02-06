const { Scholar } = require('../models/index').models;

// create a new Scholar
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Scholar
        const newScholar = new Scholar(object);
        newScholar.save((err, scholar) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created scholar
            else {
                resolve(scholar); 
            }
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Scholar.findOne(query, (err, scholar) => {
            if (err) { reject(err); }
            resolve(scholar);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Scholar.find(query, (err, scholar) => {
            if (err) { reject(err); }
            resolve(scholar);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Scholar.find((err,scholar) => {
            if(err) {reject(err); }
            resolve(scholar)
        })
    });
}

exports.getAllSorted = (query) => {
    //console.log(query)
    return new Promise((resolve, reject) => {
        Scholar.find((err,scholar) => {
            if(err) {reject(err); }
            resolve(scholar)
        })
        .sort(query)
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Scholar.findOne({ _id: object.id }, (err, scholar) => {
            if (err) { reject(err); }
            scholar.last_name = object.last_name
            scholar.first_name = object.first_name
            scholar.middle_name = object.middle_name
            scholar.suffix = object.suffix
            scholar.address = object.address
            scholar.student_no = object.student_no
            scholar.graduation_year = object.graduation_year
            scholar.mobile_no = object.mobile_no
            scholar.email = object.email
            scholar.scholarship_id = object.scholarship_id
            scholar.upload_id = object.upload_id
            
            scholar.save((err, scholar) => {
                if(err) { reject(err); }
                resolve(scholar);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Scholar.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}