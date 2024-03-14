const { Log } = require('../models/index_mdl').models;

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Log.find((err,logs) => {
            if(err) {reject(err); }
            resolve(logs)
        })
    });
}

exports.create = (user,action,description) => {
    return new Promise((resolve,reject) => {
        const object = {
            userId: user._id,
            userName: `${user.first_name} ${user.last_name}`,
            userEmail: user.email,
            userRole: user.role,
            action: action,
            description: description,
            date: new Date().toLocaleDateString(undefined, {hour:'numeric', minute:'numeric', second:'numeric'}),
        }

        const newLog = new Log(object);

        newLog.save((err, log) => {
            if(err) { reject(err); }
            else {
                resolve(log); 
            }
        });
    });
}
