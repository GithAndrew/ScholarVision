const mongoose = require('mongoose');
const Donor = require('../handlers/donor_hndlr');
// const Scholarship = require('../handlers/scholarship_hndlr');
// const Delete = require('../handlers/deleted_hndlr');
// const UserLog = require('../handlers/userlog_hndlr');
// const utils = require('./utils');

exports.findDonor = async (req,res) => {

    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({message: "Unauthorized access"});
    //     return;
    //   }
      
    //   // validate token
    // const token = await utils.verifyToken(req);
    
    //   // error validating token
    // if(!token.status){
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    const id = req.params.id

    try{
        mongoose.Types.ObjectId(id)
    }
    catch(err){
        console.log('Invalid id')
        return res.status(400).send({message: 'Invalid id'})
    }


    try{
        donor = await Donor.getOne({_id: id})
        if(!donor){
            console.log("Donor not found")
            return res.status(404).send({message: `donor not found`})
        }
        else{
            return res.status(200).send(donor)
        }
    }
    catch(err){
        console.log(`Error searching for donor in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for donor'})
    }
}

exports.findAll = async (req, res) => {

    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({message: "Unauthorized access"});
    //     return;
    //   }
      
    //   // validate token
    // const token = await utils.verifyToken(req);
    
    //   // error validating token
    // if(!token.status){
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    try{
        donor = await Donor.getAll()
        if(!donor){
            console.log("Donor database is empty")
            return res.status(404).send({message: `No donor in database`})
        }
        else{
            //console.log(donor)
            return res.status(200).send(donor)
        }
    }
    catch(err){
        console.log(`Error searching for donor in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for donor'})
    }
}
