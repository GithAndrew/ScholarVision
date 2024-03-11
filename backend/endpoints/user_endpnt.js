const { UserController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const User = Router();

User.post('/', UserController.login); 
User.put('/', UserController.changeRole);
User.get('/isLogin', UserController.isLogin);
User.get('/', UserController.findAll);
User.get('/search', UserController.search);
User.delete('/', UserController.logout);

module.exports = User;
