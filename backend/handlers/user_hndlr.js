const { User } = require('../models/index_mdl').models;

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        User.findOne(query, (err, user) => {
            if(err) { reject(err); }
            resolve(user);
        });
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        User.findOne({ email: object.email }, (err, user) => {
            if(err) { reject(err); }
            user.role = object.role
            user.save((err, user) => {
                if(err) { reject(err); }
                resolve(user);
            });
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        User.find((err,user) => {
            if(err) {reject(err); }
            resolve(user)
        })
    });
}

exports.create = (object) => {
    return new Promise((resolve,reject) => {
        const newUser = new User(object);
        newUser.save((err, user) => {
            if(err) { reject(err); }
            else {
                resolve(user); 
            }
        });
    });
}
