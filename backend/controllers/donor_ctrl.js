const mongoose = require('mongoose');
const Donor = require('../handlers/donor_hndlr');
const Scholarship = require('../handlers/scholarship_hndlr');
const Delete = require('../handlers/deleted_hndlr');
const Log = require('../handlers/log_hndlr');
const utils = require('./utils');

exports.findDonor = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }
  
    // const token = await utils.verifyToken(req);
    
    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }
  
    const id = req.params.id;
  
    try {
        mongoose.Types.ObjectId(id);
    } catch(err) {
        console.log('Invalid id');
        return res.status(400).send({ message: 'Invalid id' });
    }
  
    try {
        donor = await Donor.getOne({ _id: id });
        if (!donor) {
            console.log("Donor not found");
            return res.status(404).send({ message: `Donor not found` });
        } else {
            return res.status(200).send(donor);
        }
    } catch(err) {
        console.log(`Error searching for donor in the DB ${err}` );
        return res.status(500).send({ message: 'Error searching for donor' });
    }
}

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

    try {
        donor = await Donor.getAll();
        if (!donor) {
            console.log("Donor database is empty");
            return res.status(404).send({ message: `No donor in database` });
        } else {
            return res.status(200).send(donor);
        }
    } catch (err) {
        console.log(`Error searching for donor in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for donor' });
    }
}

exports.search = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }
  
    // const token = await utils.verifyToken(req);
    
    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    let search = req.query.name;
    let result = new Array;
    try {
        if (search == '') {
            return res.status(200).send({ result });
        }
        let donor = await Donor.getAll();
        if (!donor) {
            console.log("Donor database is empty");
            return res.status(400).send({ message: `No donor in database` });
        } else {
            search = search.toLowerCase();
            for (let i = 0; i < donor.length; i++) {
                const fname = donor[i].first_name.toLowerCase();
                const mname = donor[i].middle_name.toLowerCase();
                const lname = donor[i].last_name.toLowerCase();
                if (fname.match(search) || lname.match(search) || mname.match(search)) {
                    result.push(donor[i]);
                }
            }
            return res.status(200).send({ result });
        }
    } catch (err) {
        console.log(`Error searching for donor in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for donor' });
    }
}

exports.sortBy = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }
  
    // const token = await utils.verifyToken(req);
    
    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    let orderby = req.query;
    const key = Object.keys(orderby);
    const value = Object.values(orderby);
    try {
        if (key[0] === 'name') {
            const donor = await Donor.getAllSorted({ last_name: parseInt(value) });
            if (!donor) {
                console.log("Donor database is empty");
                return res.status(404).send({ message: `No donor in database` });
            } else {
                return res.status(200).send(donor);
            }
        } else if (key[0] === 'grant') {
            const sortedArr = new Array;
            const donor = await Donor.getAll();
            const scholarship = await Scholarship.getAllSorted(parseInt(value));
            for (i = 0; i < scholarship.length; i++) {
                for (j = 0; j < donor.length; j++) {
                    if (scholarship[i].donor_id == donor[j]._id) {
                        sortedArr.push(donor[j]);
                    }
                }
            }
            return res.status(200).send(sortedArr);
        }
    } catch (err) {
        console.log(`Error searching for scholar in the DB ${err}`);
        return res.status(500).send({ message: 'Error searching for scholar' });
    }
}

exports.addDonor = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }
  
    // const token = await utils.verifyToken(req);
    
    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    const body = req.body;

    const newDonor = {
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        birthday: body.birthday,
        birthplace: body.birthplace,
        suffix: body.suffix,
        citizenship: body.citizenship,
        mobile_no: body.mobile_no,
        email: body.email,
        address: body.address,
        sex: body.sex,
        statement: body.statement,
        upload_id: body.upload_id
    };

    try {
        const existing = await Donor.getOne({ email: newDonor.email });
        if (existing) {
            return res.status(400).send({ message: "Donor already exists" });
        }
    } catch (err) {
        console.log(`Unable to find donor. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new donor" });
    }

    try {
        const donor = await Donor.create(newDonor);
        // await Log.create(token.user, 'create', `donor ${donor._id}`);
        console.log(`New donor: \n ${donor}`);
        return res.status(201).send({ message: 'New donor successfully added' });
    } catch (err) {
        console.log(`Unable to create new donor. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new donor" });
    }
}
  
exports.editDonor = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }
  
    // const token = await utils.verifyToken(req);
    
    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    // if (token.user.role == 'admin' || token.user.role == 'member') {
        const body = req.body;
        const donor = {
            id: req.params.id,
            first_name: body.first_name,
            last_name: body.last_name,
            middle_name: body.middle_name,
            suffix: body.suffix,
            address: body.address,
            mobile_no: body.mobile_no,
            email: body.email,
            birthday: body.birthday,
            birthplace: body.birthplace,
            citizenship: body.citizenship,
            sex: body.sex,
            statement: body.statement,
            upload_id: body.upload_id
        };

        try {
            mongoose.Types.ObjectId(donor.id);
        } catch (err) {
            console.log('Invalid id');
            return res.status(400).send({ message: 'Invalid id' });
        }

        var existing = null;
        try {
            existing = await Donor.getOne({ _id: donor.id });
            if (!existing) {
                console.log("Donor not found");
                return res.status(404).send({ message: 'Donor not found' });
            }
        } catch (err) {
            console.log(`Error looking for donor in DB. Error: ${err}`);
            return res.status(500).send({ message: 'Error searching for donor in database' });
        }

        try {
            const edit = await Donor.edit(donor);
            await Log.create(token.user, 'edit', `donor ${edit._id}`);
            console.log(`Edited donor ${edit}`);
            return res.status(200).send({ message: 'Donor successfully edited' });
        } catch {
            console.log(`Unable to edit donor. Error: ${err}`);
            return res.status(500).send({ message: 'Error editing donor' });
        }
    // } else {
    //     console.log("Unauthorized access");
    //     return res.status(401).send({ message: "Unauthorized access" });
    // }
}
  
exports.deleteDonor = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }
  
    // const token = await utils.verifyToken(req);
    
    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    // if (token.user.role == 'admin' || token.user.role == 'member') {
        const idList = req.body.ids;
        let deleted = 0, failed = 0;
        let invalidId = new Array;
        let validId = new Array;

        try {
            var reqLength = idList.length;
        } catch {
            console.log('Invalid property');
            res.status(501).send({ message: 'Invalid property' });
        }

        try {
            for (let i = 0; i < reqLength; i++) {
                try {
                    mongoose.Types.ObjectId(idList[i]);
                } catch (err) {
                    console.log('Wrong format:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                    continue;
                }

                let donor = null;
                try {
                    donor = await Donor.getOne({ _id: idList[i] });
                    if (donor) {
                        await Delete.create("donor", donor);
                        // await Log.create(token.user, 'delete', `donor ${donor._id}`);
                        await Donor.delete({ _id: idList[i] });
                        console.log('Successfully deleted donor with id:', idList[i]);
                        validId[deleted] = idList[i];
                        deleted++;
                    } else {
                        console.log('Invalid donor id:', idList[i]);
                        invalidId[failed] = idList[i];
                        failed++;
                    }
                } catch (err) {
                    console.log(`Error searching for donor in the DB ${err}`);
                    return res.status(500).send({ message: 'Error searching for donor' });
                }
            }

            if (reqLength == failed) {
                res.status(404).send({ body: invalidId, message: "ids not found" })
                return;
            } else if (failed == 0) {
                res.status(200).send({ message: `Successfully deleted ${deleted} donor` });
                return;
            } else {
                res.status(201).send({ body: invalidId, message: `Successfully deleted ${deleted} donor/s but failed to delete ${failed} donor/s` });
                return;
            }
        } catch (err) {
            console.log(`Error deleting donors ${err}`);
            return res.status(500).send({ message: 'Error deleting donors' });
        }
    // } else {
    //     console.log("cannot delete: ", token.user.role);
    //     return res.status(401).send({ message: 'Unauthorized Access' });
    // }
}
