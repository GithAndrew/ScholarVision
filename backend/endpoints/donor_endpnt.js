const { DonorController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Donor = Router();

// Donor.post('/', DonorController.addDonor);
Donor.get('/:id', DonorController.findDonor);
// Donor.get('/search', DonorController.search);
// Donor.get('/orderby', DonorController.sortBy);
Donor.get('/', DonorController.findAll);
// Donor.put('/:id', DonorController.editDonor);
// Donor.delete('/', DonorController.deleteDonor);
// Donor.post('/', DonorController.addDonor); 

module.exports = Donor;