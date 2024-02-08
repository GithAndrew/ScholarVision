const { DonorController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Donor = Router();

Donor.get('/:id', DonorController.findDonor);
Donor.get('/', DonorController.findAll);
Donor.get('/search', DonorController.search);
Donor.get('/orderby', DonorController.sortBy);
Donor.post('/', DonorController.addDonor);
Donor.put('/:id', DonorController.editDonor);
Donor.delete('/', DonorController.deleteDonor);

module.exports = Donor;