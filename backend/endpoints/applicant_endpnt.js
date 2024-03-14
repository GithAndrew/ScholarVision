const { ApplicantController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Applicant = Router();

Applicant.post('/', ApplicantController.addApplicant);
Applicant.put('/:id', ApplicantController.editApplicant);
Applicant.post('/:id', ApplicantController.addField);
Applicant.delete('/', ApplicantController.deleteApplicant);
Applicant.get('/search', ApplicantController.search);
Applicant.get('/orderby', ApplicantController.sortBy);
Applicant.get('/:id', ApplicantController.findApplicant);
Applicant.get('/', ApplicantController.findAll);

module.exports = Applicant;
