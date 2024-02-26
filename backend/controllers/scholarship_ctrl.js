const mongoose = require('mongoose');
const Scholarship = require('../handlers/scholarship_hndlr');
const Log = require('../handlers/log_hndlr');
const Delete = require('../handlers/deleted_hndlr');
const utils = require('./utils');

exports.findScholarship = async (req, res) => {
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
        const scholarship = await Scholarship.getOne({ _id: id });
        if (!scholarship) {
            console.log("Scholarship not found");
            return res.status(404).send({ message: "Scholarship not found" });
        } else {
            return res.status(200).send(scholarship);
        }
    } catch(err) {
        console.log(`Error searching for scholarship in the DB: ${err}`);
        return res.status(500).send({ message: 'Error searching for scholarship' });
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

    // if (token.user.role == 'admin' || token.user.role == 'member' || token.user.role == 'scholar' || token.user.role == 'donor') {
        const sort = req.body.sort;
        if (sort == 0) {
            try {
                const scholarship = await Scholarship.getAll();
                if (!scholarship) {
                    console.log("Scholarship database is empty");
                    return res.status(404).send({ message: `No scholarship in database` });
                } else {
                    return res.status(200).send(scholarship);
                }
            } catch (err) {
                console.log(`Error searching for scholarship in the DB ${err}`);
                return res.status(500).send({ message: 'Error searching for scholarship' });
            }
        } else {
            try {
                const scholarship = await Scholarship.getAllSorted(sort);
                if (!scholarship) {
                    console.log("Scholarship database is empty");
                    return res.status(404).send({ message: `No scholarship in database` });
                } else {
                    return res.status(200).send(scholarship);
                }
            } catch (err) {
                console.log(`Error searching for scholarship in the DB ${err}`);
                return res.status(500).send({ message: 'Error searching for scholarship' });
            }
        // }
    }
};

exports.addScholarship = async (req, res) => {
    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({ message: "Unauthorized access" });
    //     return;
    // }
  
    // const token = await utils.verifyToken(req);
    
    // if (!token.status) {
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    // if (token.user.role == 'admin' || token.user.role == 'member' || token.user.role == 'donor') {
        const body = req.body;

        const newScholarship = {
            donor: body.donor,
            grant: body.grant,
            scholarshipname: body.scholarshipname,
            year: body.year,
            details: body.details,
            acceptancedate: body.acceptancedate,
            donor_id: body.donor_id
        };
    
        try {
            const scholarship = await Scholarship.create(newScholarship);
            // await Log.create(token.user, 'create', `scholarship ${scholarship._id}`)
            console.log(`New Scholarship: \n ${scholarship}`);
            return res.status(201).send({ message: 'New Scholarship successfully added' });
        } catch(err) {
            console.log(`Unable to create new Scholarship. Error: ${err}`);
            return res.status(500).send({ message: "Error creating new Scholarship" })
        }
    // } else {
    //     console.log("Unauthorized access")
    //     return res.status(401).send({message: "Unauthorized access"});
    // }
}

exports.editScholarship = async (req,res) => {
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
    
        const scholarship = {
            _id: req.params.id,
            donor: body.donor,
            scholarshipname: body.scholarshipname,
            year: body.year,
            grant: body.grant,
            details: body.details,
            acceptancedate: body.acceptancedate
        };
    
        var existing = null;
        try {
            existing = await Scholarship.getOne({id: scholarship._id});
            if (!existing) {
                console.log("Scholarship not found");
                return res.status(404).send({ message: 'Scholarship not found' });
            }
        } catch(err) {
            console.log(`Error looking for scholarship in DB. Error: ${err}`);
            return res.status(500).send({ message: 'Error searching for scholarship in database' });
        }
    
        try {
            const edit = await Scholarship.edit(scholarship);
            await Log.create(token.user, 'edit', `scholarship ${edit._id}`);
            console.log(`Edited scholarship ${edit}`);
            return res.status(200).send({ message: 'Scholarship successfully edited' });
        } catch (err) {
            console.log(`Unable to edit scholar. Error: ${err}`);
            return res.status(500).send({ message: 'Error editing scholarship' });
        }
    // } else {
    //     console.log("Unauthorized access");
    //     return res.status(401).send({message: "Unauthorized access"});
    // }

}

exports.deleteScholarship = async (req,res) => {
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
            return res.status(501).send({ message: 'Invalid property'});
        }
    
        try {
            for (let i = 0; i < reqLength; i++) {
                try {
                    mongoose.Types.ObjectId(idList[i]);
                } catch(err) {
                    console.log('Wrong format:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                    continue;
                }
        
                let scholarship = null;
                try {
                    scholarship = await Scholarship.getOne({_id: idList[i]});
                    if (scholarship) {
                        await Delete.create("scholarship", scholarship);
                        // await Log.create(token.user, 'delete', `scholarship ${scholarship._id}`);
                        await Scholarship.delete({_id: idList[i]});
                        console.log('Successfully deleted scholarship with id:', idList[i]);
                        validId[deleted] = idList[i];
                        deleted++;
                    } else {
                        console.log('Invalid scholarship id:', idList[i]);
                        invalidId[failed] = idList[i];
                        failed++;
                    }
                } catch(err) {
                    console.log(`Error searching for scholarship in the DB ${err}` );
                    return res.status(500).send({message: 'Error searching for scholarship'});
                }
            }
    
            if (reqLength == failed) {
                res.status(404).send({body: invalidId, message: "ids not found" });
                return;
            } else if (failed == 0) {
                res.status(200).send({message: `Successfully deleted ${deleted} scholarship`});
                return;
            } else {
                res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} scholarship/s but failed to delete ${failed} scholarship/s`});
                return;
            }
        } catch(err) {
            console.log(`Error deleting scholarship ${err}`);
            res.status(500).send({ message: 'Error deleting scholarship'});
            return;
        }
    // }
}
