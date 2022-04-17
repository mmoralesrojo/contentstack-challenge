import React, { useContext, useEffect } from 'react';
import _ from 'lodash'
import Planet from './Planet';
import PlanetsContext from '../context/PlanetsContext';
import config from '../config/config.json';

const PlanetsList = () => {

  const { planets, setPlanets, planetProperties } = useContext(PlanetsContext);

  const handleRemovePlanet = (id) => {
    setPlanets(planets.filter((planet) => planet.id !== id));
  };

  useEffect(() => {
    fetch(`${config.SERVER_URL}/planet`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((responseBody) => {
        setPlanets(responseBody.data);
      })
      .catch((error) => {
        console.error('Error fetching data', error);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="planet-list">
        {!_.isEmpty(planets)
          ? (planets.map((planet) => (<Planet key={planet.id} {...planet} {...planetProperties} handleRemovePlanet={handleRemovePlanet} />)))
          : (<p className="message">Weird... no planets registered, you may like add some.</p>
          )}
      </div>
    </React.Fragment>
  );
};

export default PlanetsList;