const { SchoolController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const School = Router();

School.post('/', SchoolController.setSchool);
School.get('/:id', SchoolController.findSchool);

module.exports = School;
