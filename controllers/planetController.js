const Planet = require('../models/planet');
const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');
const fetch = require('node-fetch');

module.exports = {
  getPlanets: function(req, res) {
    const name = req.query.name;
    const filter = { ...(name && { name: { $regex: new RegExp(`.*${name}.*`), $options: 'i' } }) };
    Planet.find(filter).exec(async (err, data) => {
      if (err) {
        return res.status(400).json({
          error: `There was an error: ${err.message}`
        })
      }
      if (isEmpty(data)) {
        const getSwapiPlanets = async (results, next) => {
          const response = await fetch(next, {
            method: 'GET'
          });
          if (response.status === 200) {
            const data = await response.json();
            if (data.results) {
              results = results.concat(data.results);
            }
            next = data.next;
          }
          return next ? await getSwapiPlanets(results, next) : results;
        }
        const swapiPlanetService = `https://swapi.py4e.com/api/planets?search=${name}`
        swapiResults = await getSwapiPlanets([], swapiPlanetService);
        forEach(swapiResults, (record) => {
          const newFilter = { name: record.name };
          const newPlanet = new Planet({
            name: record.name,
            diameter: record.diameter,
            rotation_period: record.rotation_period,
            orbital_period: record.orbital_period,
            gravity: record.gravity,
            population: record.population,
            climate: record.climate,
            terrain: record.terrain,
            surface_water: record.surface_water
          });
          Planet.findOneAndUpdate(newFilter, newPlanet, {
            upsert: true,
            new: true
          }, (err) => {
            if (err) console.log(`Error saving new Planet: ${err.message}`);
          });
        });
        data = data.concat(swapiResults);
      }
      return res.json({
        data
      })
    });
  }
}