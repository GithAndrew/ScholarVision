const { ApplicantController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Applicant = Router();

Applicant.post('/', ApplicantController.addApplicant);
Applicant.put('/:id', ApplicantController.editApplicant);
Applicant.delete('/', ApplicantController.deleteApplicant);
Applicant.get('/search', ApplicantController.search);
Applicant.get('/:id', ApplicantController.findApplicant);
Applicant.get('/', ApplicantController.findAll);


module.exports = Applicant;