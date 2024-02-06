const { UserController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const User = Router();

// access controllers
User.post('/', UserController.login); 
User.put('/', UserController.changeRole);
User.get('/check-if-logged-in', UserController.checkifloggedin);
User.get('/', UserController.findAll);
User.delete('/', UserController.logout);

module.exports = User;