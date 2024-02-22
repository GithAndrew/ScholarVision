const { ScholarController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Scholar = Router();

Scholar.get('/:id', ScholarController.findScholar);
Scholar.get('/', ScholarController.findAll);
Scholar.get('/search', ScholarController.search);
Scholar.get('/orderby', ScholarController.sortBy);
Scholar.post('/', ScholarController.addScholar);
Scholar.put('/:id', ScholarController.editScholar);
Scholar.delete('/', ScholarController.deleteScholar);

module.exports = Scholar;
