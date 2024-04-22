const User = require('../handlers/user_hndlr');
const jwt = require("jsonwebtoken");
const UserLogs = require('../handlers/log_hndlr');
const Deleted = require('../handlers/deleted_hndlr');
require('dotenv').config()

exports.verifyToken = (req) => {
  return jwt.verify(
    req.cookies.authToken, 
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
      let logs = await UserLogs.getAll();
      if (!logs) {
          console.log("No logs in database");
          return res.status(400).send({ message: `No logs in database` });
      } else {
          search = search.toLowerCase();
          for (let i = 0; i < logs.length; i++) {
              const name = logs[i].userName.toLowerCase();
              if (name.match(search)) {
                  result.push(logs[i]);
              }
          }
          return res.status(200).send({ result });
      }
  } catch (err) {
      console.log(`Error searching for log in the DB ${err}`);
      return res.status(500).send({ message: 'Error searching for logs' });
  }
}
