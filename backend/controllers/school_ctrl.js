const mongoose = require('mongoose');
const School = require('../handlers/school_hndlr');
const utils = require('./utils');

exports.setSchool = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }

    const token = await utils.verifyToken(req);

    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    const body = req.body;

    const newSchool = {
        school_name: body.school_name,
        email: body.email,
        contact_no: body.contact_no,
        location: body.location,
        upload_id: body.upload_id,
        member_emails: body.member_emails
    };

    console.log(body)

    try {
        const existing = await School.getOne({ school_name: newSchool.school_name });
        if (existing) {
            return res.status(400).send({ message: "School already exists" });
        }
    } catch(err) {
        console.log(`Unable to find school. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new school" });
    }

    try {
        const school = await School.create(newSchool);
        console.log(`New school: \n ${school}`);
        return res.status(201).send({ message: 'New school successfully added', school: school });
    } catch(err) {
        console.log(`Unable to create new school. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new school" });
    }
}

exports.findSchool = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }

    const token = await utils.verifyToken(req);

    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    const id = req.params.id;
    let school;

    try {
        mongoose.Types.ObjectId(id)
    } catch(err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    try {
        school = await School.getOne({ _id: id })
        if (!school) {
            console.log("School not found")
            return res.status(404).send({ message: `school not found` })
        } else {
            return res.status(200).send(school)
        }
    } catch(err) {
        console.log(`Error searching for school in the DB ${err}` );
        return res.status(500).send({ message: 'Error searching for school' })
    }
}
