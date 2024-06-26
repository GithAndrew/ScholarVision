const { DonorController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Donor = Router();

Donor.post('/', DonorController.addDonor);
Donor.put('/:id', DonorController.editDonor);
Donor.post('/:id', DonorController.addField);
Donor.delete('/', DonorController.deleteDonor);
Donor.get('/search', DonorController.search);
Donor.get('/orderby', DonorController.sortBy);
Donor.get('/', DonorController.findAll);
Donor.get('/:id', DonorController.findDonor);

module.exports = Donor;
