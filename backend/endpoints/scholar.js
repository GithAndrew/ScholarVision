const { ScholarController } = require('../controllers/index').controllers;
const Router = require('express').Router;

const Scholar = Router();

Scholar.post('/', ScholarController.addScholar);
Scholar.put('/:id', ScholarController.editScholar);
Scholar.delete('/', ScholarController.deleteScholar);
Scholar.get('/search', ScholarController.search);
Scholar.get('/orderby', ScholarController.sortBy);
Scholar.get('/:id', ScholarController.findScholar);
Scholar.get('/', ScholarController.findAll);



module.exports = Scholar;