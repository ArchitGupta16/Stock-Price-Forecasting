import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="91399337985-phg1v8mvv3j9dftn55gim8jmqjnfthis.apps.googleusercontent.com">
    <AlertProvider template={AlertTemplate} {...options}>
   <App />
    </AlertProvider>
    </GoogleOAuthProvider>;
  </React.StrictMode>
);

