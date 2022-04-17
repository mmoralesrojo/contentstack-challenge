import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

createRoot(document.getElementById('root')).render(<AppRouter />);
