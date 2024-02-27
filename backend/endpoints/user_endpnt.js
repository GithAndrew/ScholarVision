const { UserController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const User = Router();

User.post('/', UserController.login); 
User.put('/', UserController.changeRole);
User.get('/check-if-logged-in', UserController.checkifloggedin);
User.get('/', UserController.findAll);
User.delete('/', UserController.logout);

module.exports = User;