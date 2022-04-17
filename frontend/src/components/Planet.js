import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Planet = ({
  id, name, diameter, rotation_period,
  orbital_period, gravity, population, climate,
  terrain, surface_water, url, handleRemovePlanet
}) => {

  const navigate = useNavigate();

  return (
    <Card style={{ width: "18rem" }} className="planet">
      <Card.Body>
        <Card.Title className="planet-title"></Card.Title>
        <div className="planet-details">
          <div>Name: {name}</div>
          <div>Diameter: {diameter}</div>
          <div>Rotation period: {rotation_period}</div>
          <div>Orbital period: {orbital_period}</div>
          <div>Gravity: {gravity}</div>
          <div>Population: {population}</div>
          <div>Climate: {climate}</div>
          <div>Terrain: {terrain}</div>
          <div>Surface water: {surface_water}</div>
          <div>URL: {url}</div>
        </div>
        <Button variant="primary" onClick={() => navigate(`/edit/${id}`)}>Edit</Button>
        <Button variant="danger" onClick={() => handleRemovePlanet(id)}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default Planet;