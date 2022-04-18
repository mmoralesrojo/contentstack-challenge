import React, { useContext } from 'react';
import PlanetForm from './PlanetForm';
import { useParams, useNavigate } from 'react-router-dom';
import PlanetsContext from '../context/PlanetsContext';
import config from '../config/config.json';

const EditPlanet = () => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const { id } = useParams();
  const planetToEdit = planets.find((planet) => planet.id === id);
  const navigate = useNavigate();

  const handleOnSubmit = (planet) => {
    fetch(`${config.SERVER_URL}/planet/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...planet})
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
    <div>
      <PlanetForm planet={planetToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );

};

export default EditPlanet;