import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanetForm from './PlanetForm';
import PlanetsContext from '../context/PlanetsContext';
import config from '../config/config.json';

const AddPlanet = () => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const navigate = useNavigate();
  const handleOnSubmit = (planet) => {
    fetch(`${config.SERVER_URL}/planet`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...planet })
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .catch((error) => {
        console.error('Error saving data', error);
      });
    navigate('/');
  };

  return (
    <React.Fragment>
      <PlanetForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );

};

export default AddPlanet;