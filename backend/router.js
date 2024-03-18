const Scholar = require('./endpoints/scholar_endpnt');
const User = require('./endpoints/user_endpnt');
const Donor = require('./endpoints/donor_endpnt');
const Scholarship = require('./endpoints/scholarship_endpnt');
const Applicant = require('./endpoints/applicant_endpnt');
const Log = require('./endpoints/log_endpnt');
const Upload = require('./endpoints/upload_endpnt');
const School = require('./endpoints/school_endpnt');

const Router = require('express').Router;
const router = Router();

router.use('/scholar', Scholar);            //localhost:3001/scholar
router.use('/user', User);                  //localhost:3001/user
router.use('/donor', Donor);                //localhost:3001/donor
router.use('/scholarship', Scholarship);    //localhost:3001/scholarship
router.use('/applicant', Applicant);        //localhost:3001/applicant
router.use('/logs', Log);                   //localhost:3001/logs
router.use('/upload', Upload);              //localhost:3001/upload
router.use('/school', School);              //localhost:3001/school

module.exports = router;