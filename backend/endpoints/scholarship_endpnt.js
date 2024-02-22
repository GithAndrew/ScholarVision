const { ScholarshipController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Scholarship = Router();

Scholarship.get('/:id', ScholarshipController.findScholarship);
Scholarship.get('/', ScholarshipController.findAll);
Scholarship.post('/', ScholarshipController.addScholarship);
Scholarship.put('/:id', ScholarshipController.editScholarship);
Scholarship.delete('/', ScholarshipController.deleteScholarship);

module.exports = Scholarship;
