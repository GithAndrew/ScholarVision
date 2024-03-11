const User = require('../handlers/user_hndlr');
const jwt = require("jsonwebtoken");
const UserLogs = require('../handlers/log_hndlr');
const Deleted = require('../handlers/deleted_hndlr');
require('dotenv').config()

exports.verifyToken = (req) => {
  return jwt.verify(
    req.cookies.authToken, 
    `${process.env.SECRET_ACCESS_TOKEN}`, 
    async (err, tokenPayload) => {
      if(err){
        console.log('Invalid token')
        return {status:false, message: 'Invalid token', code: 401}
      }
      let userId = tokenPayload._id;
      let user = null
      try{
        user = await User.getOne({_id:userId})
        if(!user){  
          console.log(`User not known`);
          return {status: false, message: `User not known`,code:401}
        }else{                
          console.log(`User logged in!`);
          return {status: true, code: 200, user}
        }
      }catch(err){
        console.log("Error validating token");
        return {status: false, message: "Error validating token", code:500}
      }       
  })
}

exports.getLogs = async (req,res) => {
  try{
    const logs = await UserLogs.getAll();
    if(!logs){
      return res.status(400).send({message: "No logs found"})
    }
    else{
      return res.status(200).send(logs)
    }
  }
  catch(err){
    console.log(`Error getting logs ${err}` );
    return res.status(500).send({message: 'Error searching for user'})
  }
}

exports.getDeleted = async(req,res) => {
  try{
    const data = await Deleted.getAll();
    if(!data){
      return res.status(400).send({message: "No deleted objects found"})
    }
    else{
      return res.status(200).send(data)
    }
  }
  catch(err){
    console.log(`Error getting deleted objects ${err}` );
    return res.status(500).send({message: 'Error searching for deleted objects'})
  }
}
