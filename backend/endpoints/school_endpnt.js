const { SchoolController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const School = Router();

School.post('/', SchoolController.setSchool);
School.get('/', SchoolController.findAll);

module.exports = School;
