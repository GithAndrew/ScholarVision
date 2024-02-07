// access endpoints
const Donor = require('./endpoints/donor_endpnt');
// const Scholar = require('./endpoints/scholar_endpnt');
// const User = require('./endpoints/user_endpnt');
// const Scholarship = require('./endpoints/scholarship_endpnt');
// const Applicant = require('./endpoints/applicant_endpnt');
// const Log = require('./endpoints/logs_endpnt');
// const Upload = require('./endpoints/upload_endpnt');

const Router = require('express').Router;

// initialize router
const router = Router();

// add different routes
// router.use('/scholar', Scholar); //localhost:3001/scholar
// router.use('/user', User); //localhost:3001/user
router.use('/donor', Donor); //localhost:3001/donor
// router.use('/scholarship', Scholarship); //localhost:3001/scholarship
// router.use('/applicant', Applicant);    //localhost:3001/applicant
// router.use('/logs', Log);    //localhost:3001/applicant
// router.use('/upload', Upload);    //localhost:3001/applicant

module.exports = router;