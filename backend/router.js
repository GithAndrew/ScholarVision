const Router = require('express').Router;


const Scholar = require('./endpoints/scholar');

// const Donor = require('./endpoints/donor');
// const User = require('./endpoints/user');
// const Scholarship = require('./endpoints/scholarship');
// const Applicant = require('./endpoints/applicant');
// const Log = require('./endpoints/logs');
// const Upload = require('./endpoints/upload');

const router = Router();

router.use('/scholar', Scholar);            //localhost:3001/scholar
// router.use('/user', User);                  //localhost:3001/user
// router.use('/donor', Donor);                //localhost:3001/donor
// router.use('/scholarship', Scholarship);    //localhost:3001/scholarship
// router.use('/applicant', Applicant);        //localhost:3001/applicant
// router.use('/logs', Log);                   //localhost:3001/applicant
// router.use('/upload', Upload);              //localhost:3001/applicant

module.exports = router;