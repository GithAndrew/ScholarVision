const User = require('../handlers/user_hndlr');
const Log = require('../handlers/log_hndlr');
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
        role: 'guest',
    };

    try {
        var existing = null;
        existing = await User.getOne({ email: newUser.email });
        if (!existing) {
            if (userobject.hd && userobject.hd == 'up.edu.ph') {
                newUser.role = 'e.guest';
            }      
        } else {
            const tokenPayload = {_id: existing._id};
            const token = jwt.sign(tokenPayload, process.env.SECRET_ACCESS_TOKEN);
            const response = {
                success: true,
                token
            };
            await Log.create(existing, 'login', `user ${existing._id} logged in`);
            return res.status(200).cookie('authToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send(response);
        }
    } catch (err) {
        console.log(`Unable to add user. Error: ${err}`);
        res.status(500).send({ message: "Error adding new user" });
        return;
    }

    try {
        const user = await User.create(newUser);
        const tokenPayload = {_id: user._id};
        const token = jwt.sign(tokenPayload, process.env.SECRET_ACCESS_TOKEN);
        const response = {
            success: true,
            token
        };
        await Log.create(user, 'login', `user ${user._id} logged in`);
        return res.status(200).cookie('authToken', token, { maxAge: 60 * 60 * 1000, httpOnly: true }).send(response);
    } catch (err) {
        console.log(`Unable to add new user. Error: ${err}`);
        res.status(500).send({ message: "Error adding new user" });
    }
};

exports.checkifloggedin = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        console.log('Unauthorized access');
        return res.status(200).send({ message: 'Unauthorized access', status: false });
    }

    let tokenDetails = await utils.verifyToken(req);

    if (!tokenDetails.status) {
        return res.status(tokenDetails.code).send({ message: tokenDetails.message, status: false });
    }

    const user = tokenDetails.user;
    let { _id, email, first_name, last_name, picture, role } = user;

    return res.status(tokenDetails.code).send({ User: { _id, email, first_name, last_name, picture, role }, status: true });
};

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
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }

    // const token = await utils.verifyToken(req);

    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

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
    console.log("logged out");
    res.clearCookie('authToken').send();
};
