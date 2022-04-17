import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import AddPlanet from '../components/AddPlanet';
import PlanetsList from '../components/PlanetsList';
import EditPlanet from '../components/EditPlanet';
import PlanetsContext from '../context/PlanetsContext';

const AppRouter = () => {
  
  const [planets, setPlanets] = useState([]);

  const planetProperties = [
    {name: 'name', label: 'Name', type: 'text', placeholder: 'Name of the planet', isFormRequired: true},
    {name: 'diameter', label: 'Diameter', type: 'text', placeholder: 'Diameter of the planet', isFormRequired: false},
    {name: 'rotation_period', label: 'Rotation period', type: 'text', placeholder: 'Rotation period', isFormRequired: false},
    {name: 'orbital_period', label: 'Orbital period', type: 'text', placeholder: 'Orbital period', isFormRequired: false},
    {name: 'climate', label: 'Climate', type: 'text', placeholder: 'Climate', isFormRequired: false},
    {name: 'gravity', label: 'Gravity', type: 'text', placeholder: 'Gravity', isFormRequired: false},
    {name: 'terrain', label: 'Terrain', type: 'text', placeholder: 'Terrain', isFormRequired: false},
    {name: 'surface_water', label: 'Surface water', type: 'text', placeholder: 'Surface water', isFormRequired: false},
    {name: 'population', label: 'Population', type: 'text', placeholder: 'Population', isFormRequired: false},
    {name: 'url', label: 'URL', type: 'text', placeholder: 'SWAPI URL', isFormRequired: false}
  ];

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className='main-content'>
          <PlanetsContext.Provider value={{ planets, setPlanets, planetProperties }} >
            <Routes>
              <Route element={<PlanetsList />} path="/" exact={true} />
              <Route element={<AddPlanet />} path="/add" />
              <Route element={<EditPlanet />} path="/edit/:id" />
              <Route element={<Navigate to="/" replace />} path="*" />
            </Routes>
          </PlanetsContext.Provider>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default AppRouter;