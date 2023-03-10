import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from "react-router-dom";
import UserAuthContext from './context/UserAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserAuthContext>
      <HashRouter>
        <App />
      </HashRouter>
    </UserAuthContext>
  </React.StrictMode>
);

