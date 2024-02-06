const mongoose = require('mongoose');
const Scholar = require('../handlers/scholar');
const Scholarship = require('../handlers/scholarship');
const UserLog = require('../handlers/userlog');
const Delete = require('../handlers/deleted');
const utils = require('./utils');
const { estimatedDocumentCount } = require('../models/deleted');

exports.addScholar = async (req,res) => {

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
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
        address: body.address,                  //object
        father_details: body.father_details,    //object
        mother_details: body.mother_details,    //object
        guardian_name: body.guardian_name,
        guardian_contact: body.guardian_contact,
        sibling_details: body.sibling_details,  //object
        educational_bg: body.educational_bg,        //object    
        statement: body.statement,
        scholarship_id: body.scholarship_id,
        upload_id: body.upload_id
    };
    try{
        const existing = await Scholar.getOne({student_no: newScholar.student_no})
        if(existing){
            return res.status(400).send({ message: "Scholar already exists" })
        }
    }
    catch(err){
        console.log(`Unable to find scholar. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new scholar" })
    }

    try {
        const scholar = await Scholar.create(newScholar);
        await UserLog.create(token.user, 'create', `scholar ${scholar._id}`)
        console.log(`New scholar: \n ${scholar}`);
        //const log = await UserLog.create(token.user._id, 'create', `Scholar ${scholar._id}`);
        //console.log(`New Log: ${log}`);
        return res.status(201).send({ message: 'New scholar successfully added' });
    }
    catch(err) {
        console.log(`Unable to create new scholar. Error: ${err}`);
        return res.status(500).send({ message: "Error creating new scholar" })
    }
}

exports.editScholar = async (req,res) => {

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    if(token.user.role == 'admin' || token.user.role == 'member'){
        const body = req.body;
        //console.log(`scholar id: ${req.params.id}`)
    
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
            address: body.address,                  //object
            father_details: body.father_details,    //object
            mother_details: body.mother_details,    //object
            guardian_name: body.guardian_name,
            guardian_contact: body.guardian_contact,
            sibling_details: body.sibling_details,  //object
            educational_bg: body.educational_bg,        //object    
            statement: body.statement,
            scholarship_id: body.scholarship_id,
            upload_id: body.upload_id
        };
    
        try{
            mongoose.Types.ObjectId(scholar.id)
        }
        catch (err) {
            console.log('Invalid id')
            return res.status(400).send({ message: 'Invalid id' })
        }
    
        var existing = null
        try{
            existing = await Scholar.getOne({_id: scholar.id});
            if (!existing) {
                console.log("Scholar not found")
                return res.status(404).send({ message: 'Scholar not found' });
            }
        }
        catch(err){
            console.log(`Error looking for scholar in DB. Error: ${err}`);
            return res.status(500).send({ message: 'Error searching for scholar in database' })
        }
    
        try{
            const edit = await Scholar.edit(scholar)
            await UserLog.create(token.user, 'edit', `scholar ${edit._id}`)
            console.log(`Edited scholar ${edit}`)
            return res.status(200).send({ message: 'Scholar successfully edited' })
        }
        catch{
            console.log(`Unable to edit scholar. Error: ${err}`);
            return res.status(500).send({ message: 'Error editing scholar' })
        }
    }
    else{
        console.log("Unauthorized access")
        return res.status(401).send({message: "Unauthorized access"});
    }
}

exports.deleteScholar = async (req,res) => {

    if (!req.cookies || !req.cookies.authToken) {
        return res.status(401).send({message: "Unauthorized access"});
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        return res.status(token.code).send({ message: token.message });
    }

    //console.log(token.user)
    if(token.user.role == 'admin' || token.user.role == 'member'){
        const idList = req.body.ids;
        let deleted = 0, failed = 0;
        let invalidId = new Array;
        let validId = new Array;
    
        try{
            var reqLength = idList.length;
        }
        catch{
        console.log('Invalid property');
        res.status(501).send({ message: 'Invalid property'});
        }
    
        try{
            for(let i = 0; i < reqLength; i++){
                try{
                    mongoose.Types.ObjectId(idList[i]);
                }
                catch(err){
                    console.log('Wrong format:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                    continue;
                }
            
        
                let scholar = null;
                try{
                    scholar = await Scholar.getOne({_id: idList[i]});
                    //console.log(scholar);
                    if(scholar){
                        await Delete.create("scholar", scholar);
                        await UserLog.create(token.user, 'delete', `scholar ${scholar._id}`)
                        await Scholar.delete({_id: idList[i]});
                        console.log('Successfully deleted scholar with id:', idList[i]);
                        validId[deleted] = idList[i];
                        deleted++;
                    }
                    else{
                        console.log('Invalid scholar id:', idList[i]);
                        invalidId[failed] = idList[i];
                        failed++;
                    }
                }catch(err){
                    console.log(`Error searching for scholar in the DB ${err}` );
                    return res.status(500).send({message: 'Error searching for scholar'});
                }
            }
    
            if(reqLength == failed){
                res.status(404).send({body: invalidId, message: "ids not found" })
                return;
            }else if(failed == 0){
                res.status(200).send({message: `Successfully deleted ${deleted} scholar`});
                return;
            }else{
                res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} scholar/s but failed to delete ${failed} scholar/s`});
                return;
            }
            
        }catch(err){
            console.log(`Error deleting scholars ${err}`);
            res.status(500).send({ message: 'Error deleting scholars'});
            return;
        }
    }
    else{
        console.log("cannot delete: ", token.user.role)
        return res.status(401).send({message: "Unauthorized access"});
    }


    
}

exports.findScholar = async (req,res) => {

    if (!req.cookies || !req.cookies.authToken) {
        return res.status(401).send({message: "Unauthorized access"});
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        return res.status(token.code).send({ message: token.message });
    }

    //console.log(`scholar id: ${req.params.id}`)
    const id = req.params.id;
    let scholar;

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }


    try{
        scholar = await Scholar.getOne({_id: id})
        if(!scholar){
            console.log("Scholar not found")
            return res.status(404).send({message: `scholar not found`})
        }
        else{
            //console.log(scholar)
            return res.status(200).send(scholar)
        }
    }
    catch(err){
        console.log(`Error searching for scholar in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for scholar'})
    }
}

exports.findAll = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }
    try{
        let scholar = null;
        let withScholarship = new Array;
        let withoutScholarship = new Array;
        //console.log(req.query.value)

        scholar = await Scholar.getAll()
        if(!req.query.value){
            try{
                if(!scholar){
                    console.log("Scholar database is empty")
                    return res.status(404).send({message: `No scholar in database`})
                }
                else{
                    //console.log(scholar)
                    return res.status(200).send(scholar)
                }
            }
            catch(err){
                console.log(`Error searching for scholar in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for scholar'})
            }
        }
        else{
            const hasScholarship = req.query.value
            for(let i = 0; i < scholar.length; i++){
                if(!scholar[i].scholarship_id){
                    withoutScholarship.push(scholar[i])
                }
                else{
                    withScholarship.push(scholar[i])
                }
            }
            if(hasScholarship == 'true'){
                return res.status(200).send(withScholarship);
            }
            else{
                return res.status(200).send(withoutScholarship);
            }
        }
    }
    catch(err){
        console.log(`Error searching for scholar in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for scholar'})
    }


}

exports.search = async (req, res) => {

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    let search = req.query.name
    let value = req.query.value
    //console.log(search,value)
    let result = new Array;
    try{
        if(!search){
            return res.status(200).send({result})
        }
        let scholar = await Scholar.getAll()
        if(!scholar){
            console.log("Scholar database is empty")
            return res.status(400).send({message: `No scholar in database`})
        }
        else{
            search = search.toLowerCase()
            for(let i = 0; i < scholar.length; i++){
                const fname = scholar[i].first_name.toLowerCase()
                const mname = scholar[i].middle_name.toLowerCase()
                const lname = scholar[i].last_name.toLowerCase()
                if(fname.match(search) || lname.match(search) || mname.match(search)){
                    if(value){
                        if(value == 'true'){
                            if(scholar[i].scholarship_id){
                                result.push(scholar[i])
                            }
                        }
                        else if(value == 'false'){
                            if(!scholar[i].scholarship_id){
                                result.push(scholar[i])
                            }
                        }
                    }
                    else{
                        result.push(scholar[i])
                    }
                    
                }
            }
            return res.status(200).send({result})
        }
    }
    catch(err){
        console.log(`Error searching for scholar in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for scholar'})
    }
}

exports.sortBy = async(req,res) => {

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    //orderby grant,name,graduation
    //1 if ascending, -1 if descending
    let orderby = req.query
    const key = Object.keys(orderby)
    const value = Object.values(orderby)
    let withScholarship = new Array;
    let withoutScholarship = new Array;
    try{
        if(key[0] === 'name'){
            const scholar = await Scholar.getAllSorted({last_name:parseInt(value)})
            if(!scholar){
                console.log("Scholar database is empty")
                return res.status(404).send({message: `No scholar in database`})
            }
            else{
                for(let i = 0; i < scholar.length; i++){
                    if(!scholar[i].scholarship_id){
                        withoutScholarship.push(scholar[i])
                    }
                    else{
                        withScholarship.push(scholar[i])
                    }
                }
                //console.log(scholar)
                if(value[1] == 'true'){
                    return res.status(200).send(withScholarship)
                }
                else{
                    return res.status(200).send(withoutScholarship)
                }
            }
        }
        else if(key[0] === 'grant'){
            const sortedArr = new Array;
            const scholar = await Scholar.getAll()
            const scholarship = await Scholarship.getAllSorted(parseInt(value))
            for(i = 0; i < scholarship.length; i++){
                for(j = 0; j < scholar.length; j++){
                    if(scholarship[i]._id == scholar[j].scholarship_id){
                        sortedArr.push(scholar[j])
                    }
                }
            }
            return res.status(200).send(sortedArr)
        }
        else if(key[0] === 'grad'){
            const scholar = await Scholar.getAllSorted({graduation_year:parseInt(value)})
            if(!scholar){
                console.log("Scholar database is empty")
                return res.status(404).send({message: `No scholar in database`})
            }
            else{
                for(let i = 0; i < scholar.length; i++){
                    if(!scholar[i].scholarship_id){
                        withoutScholarship.push(scholar[i])
                    }
                    else{
                        withScholarship.push(scholar[i])
                    }
                }
                //console.log(scholar)
                if(value[1] == 'true'){
                    return res.status(200).send(withScholarship)
                }
                else{
                    return res.status(200).send(withoutScholarship)
                }
            }
        }
    }
    catch(err){
        console.log(`Error searching for scholar in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for scholar'})
    }
}

