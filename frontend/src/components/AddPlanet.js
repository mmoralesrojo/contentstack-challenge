import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanetForm from './PlanetForm';
import PlanetsContext from '../context/PlanetsContext';

const AddPlanet = () => {
  const { planets, setPlanets } = useContext(PlanetsContext);
  const navigate = useNavigate();
  const handleOnSubmit = (planet) => {
    setPlanets([...planets, planet]);
    navigate('/');
  };

  return (
    <React.Fragment>
      <PlanetForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );

};

export default AddPlanet;