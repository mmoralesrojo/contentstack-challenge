const app = module.exports = require('express')();
const planetController = require('../controllers/controllers').planetController;

app.get('/', planetController.getPlanets);
app.post('/', planetController.savePlanet);
app.put('/:id', planetController.updatePlanet);
app.delete('/:id', planetController.deletePlanet);