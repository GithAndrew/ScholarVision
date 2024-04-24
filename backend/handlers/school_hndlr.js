const { School } = require('../models/index_mdl').models;

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        School.findOne(query, (err, school) => {
            if(err) { reject(err); }
            resolve(school);
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        School.find((err,school) => {
            if(err) {reject(err); }
            resolve(school)
        })
    });
}

exports.create = (object) => {
    return new Promise((resolve,reject) => {
        const mainSchool = new School(object);
        mainSchool.save((err, school) => {
            if(err) { reject(err); }
            else { resolve(school); }
        });
    });
}
