const { LogController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Log = Router();

Log.get('/deleted', LogController.getDeleted);
Log.get('/', LogController.getLogs);

module.exports = Log;
