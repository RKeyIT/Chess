import './css/normalize.css';
import './css/vars.css';
import './css/global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Game } from './Game/Game';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>
);
