const app = module.exports = require('express')();
const planetController = require('../controllers/controllers').planetController;

app.use('/', planetController.getPlanets);