const User = require('../handlers/user');
const jwt = require("jsonwebtoken");
const UserLogs = require('../handlers/userlog');
const Deleted = require('../handlers/deleted');
require('dotenv').config()

exports.verifyToken = (req) => {

    return jwt.verify(
              req.cookies.authToken, 
              process.env.SECRET_ACCESS_TOKEN, //signature of the token
                  async (err, tokenPayload) => {
                  //error in validation of token
                  if(err){
                    console.log('Invalid token')
                    return {status:false, message: 'Invalid token', code: 401}
                  }
                  //no error in validating the token
  
                  //get the id of the user
                  let userId = tokenPayload._id;
                  
                  let user=null
                try{
                    user = await User.getOne({_id:userId})
  
                  //no user found given an id
                  if(!user){  
                      console.log(`User not known`);
                      return {status: false, message: `User not known`,code:401}
  
                  //else user is found
                  }else{                
                      console.log(`User logged in!`);
                      return {status: true, code: 200, user}
                  }
                    
                //error when the database was queried given the id
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
      console.log(`Error gettings logs ${err}` );
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
      // for output testing
      // for(let i = 0; i < data.length; i++){
      //   console.log(data[i].object_type)
      //   console.log(data[i].object._id.toString())
      // }
      return res.status(200).send(data)
    }
  }
  catch(err){
    console.log(`Error gettings deleted objects ${err}` );
    return res.status(500).send({message: 'Error searching for deleted objects'})
  }
}