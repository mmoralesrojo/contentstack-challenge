import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'
import Planet from './Planet';
import PlanetsContext from '../context/PlanetsContext';
import config from '../config/config.json';

const PlanetsList = () => {

  const { planets, setPlanets } = useContext(PlanetsContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRemovePlanet = async (id) => {
    await fetch(`${config.SERVER_URL}/planet/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .catch((error) => {
        console.error('Error deleting data', error);
      });
    fetchPlanets();
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetchPlanets();
    setName('');
  }

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const fetchPlanets = () => {
    fetch(`${config.SERVER_URL}/planet?name=${name ? name : ''}`)
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
  }

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <React.Fragment>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="search">
          <Form.Label>Find planet by name</Form.Label>
          <Form.Control
            className='input-control'
            type="text"
            name="name"
            value={name}
            placeholder="Planet name"
            onChange={handleInputChange} />
        </Form.Group>
        <Button variant='primary' type='submit' className='submit-btn'>
          Search
        </Button>
      </Form>
      <div className="planet-list">
        {!_.isEmpty(planets)
          ? (planets.map((planet) => (<Planet key={planet.id} {...planet} handleRemovePlanet={handleRemovePlanet} />)))
          : (<p className="message">Weird... no planets registered, you may add some.</p>
          )}
      </div>
    </React.Fragment>
  );
};

export default PlanetsList;