const { DonorController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const Donor = Router();

// access controllers

Donor.post('/', DonorController.addDonor);
Donor.put('/:id', DonorController.editDonor);
Donor.delete('/', DonorController.deleteDonor);
Donor.get('/search', DonorController.search);
Donor.get('/orderby', DonorController.sortBy);
Donor.get('/', DonorController.findAll);
Donor.post('/', DonorController.addDonor); 
Donor.get('/:id', DonorController.findDonor);

module.exports = Donor;