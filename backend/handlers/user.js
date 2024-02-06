const { User } = require('../models/index').models;

exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new User model
        const newUser = new User(object);
        newUser.save((err, user) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created user
            else {
                resolve(user); 
            }
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        User.findOne(query, (err, user) => {
            if (err) { reject(err); }
            resolve(user);
        });
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        User.findOne({ email: object.email }, (err, user) => {
            if (err) { reject(err); }
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