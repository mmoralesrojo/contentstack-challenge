import React, { useContext } from 'react';
import PlanetForm from './PlanetForm';
import { useParams, useNavigate } from 'react-router-dom';
import PlanetsContext from '../context/PlanetsContext';

const EditPlanet = () => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const { id } = useParams();
  const planetToEdit = planets.find((planet) => planet.id === id);
  const navigate = useNavigate();

  const handleOnSubmit = (planet) => {
    const filteredPlanets = planets.filter((planet) => planet.id !== id);
    setPlanets([...filteredPlanets, planet]);
    navigate('/');
  };

  return (
    <div>
      <PlanetForm planet={planetToEdit} handleOnSubmit={handleOnSubmit} />
    </div>
  );

};

export default EditPlanet;