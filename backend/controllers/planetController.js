const Planet = require('../models/planet');
const isEmpty = require('lodash/isEmpty');
const forEach = require('lodash/forEach');
const fetch = require('node-fetch');

module.exports = {
  getPlanets: (req, res) => {
    console.log('Controller: getPlanets');
    const name = req.query.name ? req.query.name : '';
    const filter = { ...(name && { name: { $regex: new RegExp(`.*${name}.*`), $options: 'i' } }) };
    Planet.find(filter).exec(async (err, data) => {
      if (err) {
        return res.status(400).json({
          error: `There was an error fetching records: ${err.message}`
        })
      }
      if (isEmpty(data)) {
        console.log('No planets on database, proceeding to fetch records from SWAPI');
        const getSwapiPlanets = async (results, next) => {
          console.log(`Fetching ${next}`);
          const response = await fetch(next, {
            method: 'GET'
          });
          if (response.status === 200) {
            const data = await response.json();
            console.log('Results from SWAPI: ', JSON.stringify(data));
            if (data.results) {
              results = results.concat(data.results);
            }
            next = data.next;
          }
          return next ? await getSwapiPlanets(results, next) : results;
        }
        const swapiPlanetService = `https://swapi.py4e.com/api/planets?search=${name}`;
        swapiResults = await getSwapiPlanets([], swapiPlanetService);
        forEach(swapiResults, async (record) => {
          const newFilter = { name: record.name };
          const planetObject = {
            name: record.name,
            diameter: record.diameter,
            rotation_period: record.rotation_period,
            orbital_period: record.orbital_period,
            gravity: record.gravity,
            population: record.population,
            climate: record.climate,
            terrain: record.terrain,
            surface_water: record.surface_water,
            url: record.url
          };
          const newPlanet = new Planet(planetObject);
          data.push(newPlanet);
          await Planet.findOneAndUpdate(newFilter, newPlanet, {
            upsert: true,
            new: true
          }).exec();
        });
      }
      return res.json(
        {
          data: data.map((row) => {
            const realRow = row.toObject();
            const newRow = { id: realRow._id, ...realRow };
            delete newRow._id;
            return newRow;
          })
        }
      );
    });
  },
  savePlanet: (req, res) => {
    console.log('Controller: savePlanet');
    const { name, diameter, rotation_period, orbital_period, gravity, population, climate, terrain, surface_water } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'You must specify at least the name of the planet'
      });
    }

    const planetObject = {
      name, diameter, rotation_period, orbital_period, gravity, population, climate, terrain, surface_water
    };
    Planet.create(planetObject, (err) => {
      if (err) return res.status(400).json({ error: `There was an error saving the planet: ${err.message}` });
      return res.json(planetObject);
    });
  },
  updatePlanet: (req, res) => {
    console.log('Controller: updatePlanet');
    const { id } = req.params;
    const { name, diameter, rotation_period, orbital_period, gravity, population, climate, terrain, surface_water } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'You must specify at least the name of the planet'
      });
    }

    Planet.findByIdAndUpdate(id, {
      name, diameter, rotation_period, orbital_period, gravity, population, climate, terrain, surface_water
    }, (err, planetUpdated) => {
      if (err) return res.status(400).json({ error: `There was an error updating the planet information: ${err.message}` });
      return res.json({ data: planetUpdated });
    });

  },
  deletePlanet: (req, res) => {
    const { id } = req.params;
    Planet.findByIdAndDelete(id, (err) => {
      if (err) return res.status(400).json({ error: `There was an error deleting the planet: ${err.message}` });
      return res.json({ message: 'Planet deleted successfully' });
    });
  }
}