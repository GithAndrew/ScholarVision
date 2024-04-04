const mongoose = require('mongoose');
const Scholar = require('../handlers/scholar_hndlr');
const Scholarship = require('../handlers/scholarship_hndlr');
const Log = require('../handlers/log_hndlr');
const Delete = require('../handlers/deleted_hndlr');
const utils = require('./utils');

exports.findScholar = async (req, res) => {
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
    let scholar;

    try {
        mongoose.Types.ObjectId(id)
    } catch(err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    try {
        scholar = await Scholar.getOne({ _id: id })
        if (!scholar) {
            console.log("Scholar not found")
            return res.status(404).send({ message: `scholar not found` })
        } else {
            return res.status(200).send(scholar)
        }
    } catch(err) {
        console.log(`Error searching for scholar in the DB ${err}` );
        return res.status(500).send({ message: 'Error searching for scholar' })
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
    
    try {
        let scholar = null;
        let withScholarship = [];
        let withoutScholarship = [];

        scholar = await Scholar.getAll()
        if (!req.query.value) {
            try {
                if (!scholar) {
                    console.log("Scholar database is empty")
                    return res.status(404).send({ message: `No scholar in database` })
                } else {
                    return res.status(200).send(scholar)
                }
            } catch(err) {
                console.log(`Error searching for scholar in the DB ${err}` );
                return res.status(500).send({ message: 'Error searching for scholar' })
            }
        } else {
            const hasScholarship = req.query.value
            for (let i = 0; i < scholar.length; i++) {
                if (!scholar[i].scholarship_id) {
                    withoutScholarship.push(scholar[i])
                } else {
                    withScholarship.push(scholar[i])
                }
            }
            if (hasScholarship == 'true') {
                return res.status(200).send(withScholarship);
            } else {
                return res.status(200).send(withoutScholarship);
            }
        }
    } catch(err) {
        console.log(`Error searching for scholar in the DB ${err}` );
        return res.status(500).send({ message: 'Error searching for scholar' })
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
    let value = req.query.value;
    let result = [];
    try {
        if (!search) {
            return res.status(200).send({ result });
        }
        let scholar = await Scholar.getAll();
        if (!scholar) {
            console.log("Scholar database is empty");
            return res.status(400).send({ message: `No scholar in database` });
        } else {
            search = search.toLowerCase();
            for (let i = 0; i < scholar.length; i++) {
                const fname = scholar[i].first_name.toLowerCase();
                const mname = scholar[i].middle_name.toLowerCase();
                const lname = scholar[i].last_name.toLowerCase();
                if (fname.match(search) || lname.match(search) || mname.match(search)) {
                    if (value) {
                        if (value == 'true') {
                            if (scholar[i].scholarship_id) {
                                result.push(scholar[i]);
                            }
                        } else if (value == 'false') {
                            if (!scholar[i].scholarship_id) {
                                result.push(scholar[i]);
                            }
                        }
                    } else {
                        result.push(scholar[i]);
                    }
                }
            }
            return res.status(200).send({ result });
        }
    } catch(err) {
        console.log(`Error searching for scholar in the DB ${err}` );
        return res.status(500).send({ message: 'Error searching for scholar' });
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
    let withScholarship = [];
    let withoutScholarship = [];

    try {
        scholarGetAll = await Scholar.getAll();
        let newFields = [];
        if (scholarGetAll && scholarGetAll.length > 0 && scholarGetAll[0].newFields) {
            newFields = Object.keys(scholarGetAll[0].newFields);
        }
        let toSort = key[0];
        if (newFields.includes(key[0])) {
            toSort = `newFields.${key[0]}`;
        }
        const scholar = await Scholar.getAllSorted({ [toSort]: parseInt(value) });
        if (!scholar) {
            console.log("Scholar database is empty");
            return res.status(404).send({ message: `No scholar in database` });
        } else {
            if (key[0] === 'grant') {
                const sortedArr = [];
                const scholar = await Scholar.getAll();
                const scholarship = await Scholarship.getAllSorted(parseInt(value));
                for (let i = 0; i < scholarship.length; i++) {
                    for (let j = 0; j < scholar.length; j++) {
                        if (scholarship[i]._id == scholar[j].scholarship_id) {
                            sortedArr.push(scholar[j]);
                        }
                    }
                }
                return res.status(200).send(sortedArr);
            } else {
                for (let i = 0; i < scholar.length; i++) {
                    if (!scholar[i].scholarship_id) {
                        withoutScholarship.push(scholar[i]);
                    } else {
                        withScholarship.push(scholar[i]);
                    }
                }
                if (value[1] == 'true') {
                    return res.status(200).send(withScholarship);
                } else {
                    return res.status(200).send(withoutScholarship);
                }
            }
        }
    } catch (err) {
        console.log(`Error searching for scholar in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for scholar' });
    }
}
  
exports.addScholar = async (req, res) => {
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

    const newScholar = {
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
        scholarship_id: body.scholarship_id,
        acceptance_date: body.acceptance_date,
        upload_id: body.upload_id,
        newFields: body.newFields
    };

    console.log(body)

    try {
        const existing = await Scholar.getOne({ student_no: newScholar.student_no });
        if (existing) {
            return res.status(400).send({ message: "Scholar already exists" });
        }
    } catch(err) {
        console.log(`Unable to find scholar. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new scholar" });
    }

    try {
        const scholar = await Scholar.create(newScholar);
        await Log.create(token.user, 'create', `accepted scholar ${scholar.first_name} ${scholar.last_name}`);
        console.log(`New scholar: \n ${scholar}`);
        return res.status(201).send({ message: 'New scholar successfully added' });
    } catch(err) {
        console.log(`Unable to create new scholar. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new scholar" });
    }
}
  
exports.editScholar = async (req, res) => {
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

        const scholar = {
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
            scholarship_id: body.scholarship_id,
            acceptance_date: body.acceptance_date,
            upload_id: body.upload_id,
            newFields: body.newFields
        };

        try {
            mongoose.Types.ObjectId(scholar.id);
        } catch (err) {
            console.log('Invalid id');
            return res.status(400).send({ message: 'Invalid id' });
        }

        var existing = null;
        try {
            existing = await Scholar.getOne({ _id: scholar.id });
            if (!existing) {
                console.log("Scholar not found");
                return res.status(404).send({ message: 'Scholar not found' });
            }
        } catch(err) {
            console.log(`Error looking for scholar in DB. Error: ${err}`);
            return res.status(500).send({ message: 'Error searching for scholar in database' });
        }

        try {
            const edit = await Scholar.edit(scholar);
            await Log.create(token.user, 'edit', `edited scholar ${edit.first_name} ${edit.last_name}`);
            console.log(`Edited scholar ${edit}`);
            return res.status(200).send({ message: 'Scholar successfully edited' });
        } catch(err) {
            console.log(`Unable to edit scholar. Error: ${err}`);
            return res.status(500).send({ message: 'Error editing scholar' });
        }
    } else {
        console.log("Unauthorized access");
        return res.status(401).send({ message: "Unauthorized access" });
    }
}

exports.deleteScholar = async (req, res) => {
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
        const idList = req.body.ids;
        let deleted = 0, failed = 0;
        let invalidId = [];
        let validId = [];

        try {
            var reqLength = idList.length;
        } catch {
            console.log('Invalid property');
            return res.status(501).send({ message: 'Invalid property' });
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

                let scholar = null;
                try {
                    scholar = await Scholar.getOne({ _id: idList[i] });
                    if (scholar) {
                        await Delete.create("scholar", scholar);
                        await Log.create(token.user, 'delete', `deleted scholar ${scholar.first_name} ${scholar.last_name}`);
                        await Scholar.delete({ _id: idList[i] });
                        console.log('Successfully deleted scholar with id:', idList[i]);
                        validId.push(idList[i]);
                        deleted++;
                    } else {
                        console.log('Invalid scholar id:', idList[i]);
                        invalidId.push(idList[i]);
                        failed++;
                    }
                } catch(err) {
                    console.log(`Error searching for scholar in the DB ${err}`);
                    return res.status(500).send({ message: 'Error searching for scholar' });
                }
            }

            if (reqLength === failed) {
                return res.status(404).send({ body: invalidId, message: "ids not found" });
            } else if (failed === 0) {
                return res.status(200).send({ message: `Successfully deleted ${deleted} scholar` });
            } else {
                return res.status(201).send({ body: invalidId, message: `Successfully deleted ${deleted} scholar/s but failed to delete ${failed} scholar/s` });
            }
        } catch(err) {
            console.log(`Error deleting scholars ${err}`);
            return res.status(500).send({ message: 'Error deleting scholars' });
        }
    } else {
        console.log("Cannot delete: ", token.user.role);
        return res.status(401).send({ message: "Unauthorized access" });
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

        const scholar = {
            id: req.params.id,
            newFields: body.newFields
        };

        try {
            mongoose.Types.ObjectId(scholar.id);
        } catch (err) {
            console.log('Invalid id');
            return res.status(400).send({ message: 'Invalid id' });
        }

        var existing = null;
        try {
            existing = await Scholar.getOne({ _id: scholar.id });
            if (!existing) {
                console.log("Scholar not found");
                return res.status(404).send({ message: 'Scholar not found' });
            }
        } catch(err) {
            console.log(`Error looking for scholar in DB. Error: ${err}`);
            return res.status(500).send({ message: 'Error searching for scholar in database' });
        }

        const mergedNewFields = { ...existing.newFields, ...scholar.newFields };

        const existingScholar = {
            id: req.params.id,
            newFields : mergedNewFields
        }

        try {
            const edit = await Scholar.addfield(existingScholar);
            await Log.create(token.user, 'edit', `edited scholar ${edit.first_name} ${edit.last_name}`);
            console.log(`Edited scholar ${edit}`);
            return res.status(200).send({ message: 'Scholar successfully edited' });
        } catch(err) {
            console.log(`Unable to edit scholar. Error: ${err}`);
            return res.status(500).send({ message: 'Error editing scholar' });
        }
    } else {
        console.log("Unauthorized access");
        return res.status(401).send({ message: "Unauthorized access" });
    }
}
