const { UserLog } = require('../models/index').models;

exports.create = (user,action,description) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Scholar
        const object = {
            userId: user._id,
            userEmail: user.email,
            action: action,
            description: description,
            date: new Date().toLocaleDateString(undefined, {hour:'numeric', minute:'numeric', second:'numeric'}),
        }

        const newLog = new UserLog(object);

        newLog.save((err, log) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created log
            else {
                resolve(log); 
            }
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        UserLog.find((err,logs) => {
            if(err) {reject(err); }
            resolve(logs)
        })
    });
}