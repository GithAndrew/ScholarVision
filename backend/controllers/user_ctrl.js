const mongoose = require('mongoose');
const User = require('../handlers/user_hndlr');
const Log = require('../handlers/log_hndlr');
const School = require('../handlers/school_hndlr');
const Delete = require('../handlers/deleted_hndlr');
const utils = require('./utils');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.login = async (req, res) => {
    const userobject = jwt_decode(req.body.token);

    const newUser = {
        email: userobject.email,
        first_name: userobject.given_name,
        last_name: userobject.family_name,
        picture: userobject.picture,
        role: 'guest'
    };

    console.log(req.body.school)

    try {
        var existing = null;
        existing = await User.getOne({ email: newUser.email });
        if (!existing) {
            var school = null;
            school = await School.getOne({ _id: req.body.school});
            if (school.member_emails.includes(userobject.email)) {newUser.role = 'member';}
            if (school.admin_email === userobject.email) {newUser.role = 'admin';}
        } else {
            const tokenPayload = {_id: existing._id};
            const token = jwt.sign(tokenPayload, `${process.env.JWT_SECRET_KEY}`);
            const response = {
                success: true,
                token
            };
            await Log.create(existing, 'login', `user ${existing.first_name} ${existing.last_name} logged in`);
            return res.status(200).cookie('authToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true }).send(response);
        }
    } catch (err) {
        console.log(`Unable to add user. Error: ${err}`);
        res.status(500).send({ message: "Error adding new user" });
        return;
    }

    try {
        const user = await User.create(newUser);
        const tokenPayload = {_id: user._id};
        const token = jwt.sign(tokenPayload, `${process.env.JWT_SECRET_KEY}`);
        console.log(token)
        const response = {
            success: true,
            token
        };
        await Log.create(user, 'login', `user ${user.first_name} ${user.last_name} logged in`);
        return res.status(200).cookie('authToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true }).send(response);
    } catch (err) {
        console.log(`Unable to add new user. Error: ${err}`);
        res.status(500).send({ message: "Error adding new user" });
    }
};

exports.isLogin = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     console.log('Unauthorized access');
    //     return res.status(200).send({ message: 'Unauthorized access', status: false });
    // }

    let tokenDetails = await utils.verifyToken(req);

    if (!tokenDetails.status) {
        return res.status(tokenDetails.code).send({ message: tokenDetails.message, status: false });
    }

    const user = tokenDetails.user;
    let { _id, email, first_name, last_name, picture, role } = user;

    return res.status(tokenDetails.code).send({ User: { _id, email, first_name, last_name, picture, role }, status: true });
};

exports.search = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    let search = req.query.name;
    let result = new Array();
    try {
        if (search === '') {
            return res.status(200).send({ result });
        }
        let user = await User.getAll();
        if (!user) {
            console.log("User database is empty");
            return res.status(400).send({ message: `No user in database` });
        } else {
            search = search.toLowerCase();
            for (let i = 0; i < user.length; i++) {
                const fname = user[i].first_name.toLowerCase();
                const lname = user[i].last_name.toLowerCase();
                if (fname.match(search) || lname.match(search)) {
                    result.push(user[i]);
                }
            }
            return res.status(200).send({ result });
        }
    } catch (err) {
        console.log(`Error searching for user in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for user' });
    }
}

exports.changeRole = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    if (token.user.role == 'admin' || token.user.role == 'member') {
        const email = req.body.email;
        const newRole = req.body.role;
        try {
            const existing = await User.getOne({ email: email });
            if (existing) {
                if (existing.role == 'admin') {
                    console.log("Unauthorized Access");
                    return res.status(401).send({ message: "Unauthorized access" });
                }
                const user = {
                    email: existing.email,
                    first_name: existing.first_name,
                    last_name: existing.last_name,
                    picture: existing.picture,
                    role: newRole
                };
                const edit = await User.edit(user);
                console.log(`User role changed: ${edit}`);
                return res.status(200).send({ message: 'User role updated' });
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send({ message: `Error changing user's role` });
        }
    } else {
        console.log("Unauthorized Access");
        return res.status(401).send({ message: "Unauthorized access" });
    }
};

exports.findAll = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    let user;
    try {
        user = await User.getAll();
        if (!user) {
            console.log("User database is empty");
            return res.status(404).send({ message: `No user in database` });
        } else {
            return res.status(200).send(user);
        }
    } catch (err) {
        console.log(`Error searching for user in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for user' });
    }
};

exports.logout = (req, res) => {
    console.log("User logged out.");
    res.clearCookie('authToken').send();
};

exports.deleteUser = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    const idList = req.body.ids;
    let deleted = 0, failed = 0;
    let invalidId = [];
    
    try {
        var reqLength = idList.length;
    } catch {
        console.log('Invalid property');
        res.status(501).send({ message: 'Invalid property' });
        return;
    }

    try {
        for (let i = 0; i < reqLength; i++) {
            try {
                mongoose.Types.ObjectId(idList[i]);
            } catch(err) {
                console.log('Wrong format:', idList[i]);
                invalidId.push(idList[i]);
                failed++;
                continue;
            }

            let user = null;
            try {
                user = await User.getOne({ _id: idList[i] });
                if (user) {
                    await Delete.create("user", user);
                    await Log.create(token.user, 'delete', `deleted user ${user.first_name} ${user.last_name}`);
                    await User.delete({ _id: idList[i] });
                    console.log('Successfully deleted user with id:', idList[i]);
                    deleted++;
                } else {
                    console.log('Invalid user id:', idList[i]);
                    invalidId.push(idList[i]);
                    failed++;
                }
            } catch(err) {
                console.log(`Error searching for user in the DB ${err}`);
                return res.status(500).send({ message: 'Error searching for user' });
            }
        }

        if (reqLength == failed) {
            res.status(404).send({ body: invalidId, message: "ids not found" });
        } else if (failed == 0) {
            res.status(200).send({ message: `Successfully deleted ${deleted} user` });
        } else {
            res.status(201).send({ body: invalidId, message: `Successfully deleted ${deleted} user/s but failed to delete ${failed} user/s` });
        }
    } catch(err) {
        console.log(`Error deleting applicants ${err}`);
        res.status(500).send({ message: 'Error deleting applicants' });
    }
}
