const mongoose = require('mongoose');
const Applicant = require('../handlers/applicant_hndlr');
const Log = require('../handlers/log_hndlr');
const Delete = require('../handlers/deleted_hndlr');
const utils = require('./utils');

exports.findApplicant = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    const id = req.params.id;
    let applicant;

    try {
        mongoose.Types.ObjectId(id);
    } catch (err) {
        console.log('Invalid id');
        return res.status(400).send({ message: 'Invalid id' });
    }

    try {
        applicant = await Applicant.getOne({ _id: id });
        if (!applicant) {
            console.log("Applicant not found");
            return res.status(404).send({ message: `applicant not found` });
        } else {
            return res.status(200).send(applicant);
        }
    } catch (err) {
        console.log(`Error searching for applicant in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for applicant' });
    }
}

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

    let applicant;
    try {
        applicant = await Applicant.getAll();
        if (!applicant) {
            console.log("Applicant database is empty");
            return res.status(404).send({ message: `No applicant in database` });
        } else {
            return res.status(200).send(applicant);
        }
    } catch (err) {
        console.log(`Error searching for applicant in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for applicant' });
    }
}

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
        let applicant = await Applicant.getAll();
        if (!applicant) {
            console.log("Applicant database is empty");
            return res.status(400).send({ message: `No applicant in database` });
        } else {
            search = search.toLowerCase();
            for (let i = 0; i < applicant.length; i++) {
                const fname = applicant[i].first_name.toLowerCase();
                const mname = applicant[i].middle_name.toLowerCase();
                const lname = applicant[i].last_name.toLowerCase();
                if (fname.match(search) || lname.match(search) || mname.match(search)) {
                    result.push(applicant[i]);
                }
            }
            return res.status(200).send({ result });
        }
    } catch (err) {
        console.log(`Error searching for applicant in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for applicant' });
    }
}

exports.sortBy = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);
    
    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    let orderby = req.query;
    const key = Object.keys(orderby);
    const value = Object.values(orderby);

    try {
        applicantGetAll = await Applicant.getAll();
        let newFields = [];
        if (applicantGetAll && applicantGetAll.length > 0 && applicantGetAll[0].newFields) {
            newFields = Object.keys(applicantGetAll[0].newFields);
        }
        let toSort = key[0];
        if (newFields.includes(key[0])) {
            toSort = `newFields.${key[0]}`;
        }
        const applicant = await Applicant.getAllSorted({ [`${toSort}`]: parseInt(value) });
        if (!applicant) {
            console.log("Applicant database is empty");
            return res.status(404).send({ message: `No applicant in database` });
        } else {
            return res.status(200).send(applicant);
        }
    } catch (err) {
        console.log(`Error searching for applicant in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for applicant' });
    }
}

exports.addApplicant = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    const body = req.body;

    const newApplicant = {
        last_name: body.last_name,
        first_name: body.first_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        student_no: body.student_no,
        graduation_year: body.graduation_year,
        mobile_no: body.mobile_no,
        email: body.email,
        birthday: body.birthday,
        birthplace: body.birthplace,
        sex: body.sex,
        citizenship: body.citizenship,
        address: body.address,
        father_details: body.father_details,
        mother_details: body.mother_details,
        guardian_details: body.guardian_details,
        sibling_details: body.sibling_details,
        educational_bg: body.educational_bg,
        statement: body.statement,
        applicant_link: body.applicant_link,
        upload_id: body.upload_id
    };

    try {
        const existing = await Applicant.getOne({ email: newApplicant.email });
        if (existing) {
            return res.status(400).send({ message: "Applicant already exists" });
        }
    } catch (err) {
        console.log(`Unable to find applicant. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new applicant" });
    }

    try {
        const applicant = await Applicant.create(newApplicant);
        await Log.create(token.user, 'create', `added applicant ${applicant.first_name} ${applicant.last_name}`);
        console.log(`New applicant: \n ${applicant}`);
        return res.status(201).send({ message: 'New applicant successfully added' });
    } catch (err) {
        console.log(`Unable to create new applicant. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new applicant" });
    }
}

exports.editApplicant = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    const body = req.body;
    console.log(`applicant id: ${req.params.id}`);

    const applicant = {
        id: req.params.id,
        last_name: body.last_name,
        first_name: body.first_name,
        middle_name: body.middle_name,
        suffix: body.suffix,
        student_no: body.student_no,
        graduation_year: body.graduation_year,
        mobile_no: body.mobile_no,
        email: body.email,
        birthday: body.birthday,
        birthplace: body.birthplace,
        sex: body.sex,
        citizenship: body.citizenship,
        address: body.address,
        father_details: body.father_details,
        mother_details: body.mother_details,
        guardian_details: body.guardian_details,
        sibling_details: body.sibling_details,
        educational_bg: body.educational_bg,
        statement: body.statement,
        applicant_link: body.applicant_link,
        upload_id: body.upload_id
    };

    try {
        mongoose.Types.ObjectId(applicant.id);
    } catch(err) {
        console.log('Invalid id');
        return res.status(400).send({ message: 'Invalid id' });
    }

    var existing = null;
    try {
        existing = await Applicant.getOne({ _id: applicant.id });
        if (!existing) {
            console.log("Applicant not found");
            return res.status(404).send({ message: 'Applicant not found' });
        }
    } catch(err) {
        console.log(`Error looking for applicant in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for applicant in database' });
    }

    try {
        const edit = await Applicant.edit(applicant);
        await Log.create(token.user, 'edit', `edited applicant ${edit.first_name} ${edit.last_name}`);
        console.log(`Edited applicant ${edit}`);
        return res.status(200).send({ message: 'Applicant successfully edited' });
    } catch(err) {
        console.log(`Unable to edit applicant. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing applicant' });
    }
}

exports.deleteApplicant = async (req, res) => {
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

            let applicant = null;
            try {
                applicant = await Applicant.getOne({ _id: idList[i] });
                if (applicant) {
                    await Delete.create("applicant", applicant);
                    await Log.create(token.user, 'delete', `deleted applicant ${applicant.first_name} ${applicant.last_name}`);
                    await Applicant.delete({ _id: idList[i] });
                    console.log('Successfully deleted applicant with id:', idList[i]);
                    deleted++;
                } else {
                    console.log('Invalid applicant id:', idList[i]);
                    invalidId.push(idList[i]);
                    failed++;
                }
            } catch(err) {
                console.log(`Error searching for applicant in the DB ${err}`);
                return res.status(500).send({ message: 'Error searching for applicant' });
            }
        }

        if (reqLength == failed) {
            res.status(404).send({ body: invalidId, message: "ids not found" });
        } else if (failed == 0) {
            res.status(200).send({ message: `Successfully deleted ${deleted} applicant` });
        } else {
            res.status(201).send({ body: invalidId, message: `Successfully deleted ${deleted} applicant/s but failed to delete ${failed} applicant/s` });
        }
    } catch(err) {
        console.log(`Error deleting applicants ${err}`);
        res.status(500).send({ message: 'Error deleting applicants' });
    }
}

exports.addField = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({ message: "Unauthorized access" });
        return;
    }

    const token = await utils.verifyToken(req);

    if (!token.status) {
        res.status(token.code).send({ message: token.message });
        return;
    }

    if (token.user.role === 'admin' || token.user.role === 'member') {
        const body = req.body;

        const applicant = {
            id: req.params.id,
            newFields: body.newFields
        };

        try {
            mongoose.Types.ObjectId(applicant.id);
        } catch (err) {
            console.log('Invalid id');
            return res.status(400).send({ message: 'Invalid id' });
        }

        var existing = null;
        try {
            existing = await Applicant.getOne({ _id: applicant.id });
            if (!existing) {
                console.log("Applicant not found");
                return res.status(404).send({ message: 'Applicant not found' });
            }
        } catch(err) {
            console.log(`Error looking for applicant in DB. Error: ${err}`);
            return res.status(500).send({ message: 'Error searching for applicant in database' });
        }

        const mergedNewFields = { ...existing.newFields, ...applicant.newFields };

        const existingApplicant = {
            id: req.params.id,
            newFields : mergedNewFields
        }

        try {
            const edit = await Applicant.addfield(existingApplicant);
            await Log.create(token.user, 'edit', `edited applicant ${edit.first_name} ${edit.last_name}`);
            console.log(`Edited applicant ${edit}`);
            return res.status(200).send({ message: 'Applicant successfully edited' });
        } catch(err) {
            console.log(`Unable to edit applicant. Error: ${err}`);
            return res.status(500).send({ message: 'Error editing applicant' });
        }
    } else {
        console.log("Unauthorized access");
        return res.status(401).send({ message: "Unauthorized access" });
    }
}
