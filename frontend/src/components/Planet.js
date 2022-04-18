import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlanetsContext from '../context/PlanetsContext';
import _ from 'lodash';

const Planet = ({
  handleRemovePlanet,
  ...planet
}) => {
  const navigate = useNavigate();
  const { planetProperties } = useContext(PlanetsContext);

  return (
    <Card style={{ width: "18rem" }} className="planet">
      <Card.Body>
        <Card.Title className="planet-title"></Card.Title>
        <div className="planet-details">
          {
            planetProperties.map((planetProperty) => {
              return <div key={planetProperty.label}>{planetProperty.label}: {_.get(planet, planetProperty.name)}</div>
            })
          }
        </div>
        <Button variant="primary" onClick={() => navigate(`/edit/${planet.id}`)}>Edit</Button>
        <Button variant="danger" onClick={() => handleRemovePlanet(planet.id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default Planet;