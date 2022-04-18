const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planetSchema = new Schema({
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
  },
  url: {
    type: String
  }
});

module.exports = mongoose.model('Planet', planetSchema, 'planet');
