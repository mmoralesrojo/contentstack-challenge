const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  diameter: {
    type: String
  },
  rotation_period: {
    type: String
  },
  orbital_period: {
    type: String
  },
  gravity: {
    type: String
  },
  population: {
    type: String
  },
  climate: {
    type: String
  },
  terrain: {
    type: String
  },
  surface_water: {
    type: String
  }
});

module.exports = mongoose.model('Planet', planetSchema, 'planet');
