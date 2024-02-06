const { LogController } = require('../controllers/index').controllers;
const Router = require('express').Router;

// initialize User router
const Log = Router();

// access controllers
Log.get('/deleted', LogController.getDeleted);
Log.get('/', LogController.getLogs);
module.exports = Log;