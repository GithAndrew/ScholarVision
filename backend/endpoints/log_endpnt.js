const { LogController } = require('../controllers/index_ctrl').controllers;
const Router = require('express').Router;

const Log = Router();

Log.get('/', LogController.getLogs);
Log.get('/deleted', LogController.getDeleted);

module.exports = Log;
