import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import _ from 'lodash';
import PlanetsContext from '../context/PlanetsContext';

const PlanetForm = (props) => {

  const { planetProperties } = useContext(PlanetsContext);

  const [planet, setPlanet] = useState(() => {
    return planetProperties.reduce((prev, curr) => ({
      ...prev, [curr.name]: props.planet ? _.get(props.planet, curr.name) : ''
    }), {});

  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    let errorMsg = '';
    const allFieldsFilled = planetProperties.every((field) => !field.isFormRequired || !!(_.get(planet, field.name).trim()));

    if (allFieldsFilled) {
      const planetForm = {
        ...(planetProperties.reduce((prev, curr) => ({
          ...prev, [curr.name]: _.get(planet, curr.name)
        }), {}))
      };
      props.handleOnSubmit(planetForm);
    } else {
      errorMsg = 'Please fill out all the fields';
    }

    setErrorMsg(errorMsg);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      default:
        setPlanet((prevState) => ({
          ...prevState, [name]: value
        }));
    }
  };

  return (
    <div className='main-form'>
      {errorMsg && <p className='errorMsg'>{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        {planetProperties.map((item) => {
          return (
            <Form.Group controlId={item.name} key={item.name}>
              <Form.Label>{item.label}</Form.Label>
              <Form.Control
                className='input-control'
                type={item.type}
                name={item.name}
                value={_.get(planet, item.name)}
                placeholder={item.placeholder}
                onChange={handleInputChange} />
            </Form.Group>)
        })}
        <Button variant='primary' type='submit' className='submit-btn'>
          Submit
        </Button>
      </Form>
    </div>
  );

}

export default PlanetForm;