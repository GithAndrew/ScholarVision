const { ScholarshipController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const Scholarship = Router();

// access controllers
Scholarship.post('/', ScholarshipController.addScholarship);
Scholarship.put('/:id', ScholarshipController.editScholarship);
Scholarship.delete('/', ScholarshipController.deleteScholarship);
Scholarship.get('/:id', ScholarshipController.findScholarship);
Scholarship.get('/', ScholarshipController.findAll);

module.exports = Scholarship;