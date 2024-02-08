const { ApplicantController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Applicant = Router();

Applicant.get('/:id', ApplicantController.findApplicant);
Applicant.get('/', ApplicantController.findAll);
Applicant.get('/search', ApplicantController.search);
Applicant.post('/', ApplicantController.addApplicant);
Applicant.put('/:id', ApplicantController.editApplicant);
Applicant.delete('/', ApplicantController.deleteApplicant);

module.exports = Applicant;