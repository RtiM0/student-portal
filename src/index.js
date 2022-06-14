import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify, { Auth } from 'aws-amplify';

const root = ReactDOM.createRoot(document.getElementById('root'));
Amplify.configure({
  Auth: {
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USERPOOLID,
    userPoolWebClientId: process.env.REACT_APP_CLIENTID,
    mandatorySignIn: true,
    cookieStorage: {
      domain: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_ENDPOINT : "localhost",
      path: "/",
      expires: 365,
      secure: true
    }
  },
  API: {
    endpoints: [
      {
        name: "student-portal-api",
        endpoint: process.env.REACT_APP_API_ENDPOINT,
        region: process.env.REACT_APP_REGION,
        custom_header: async () => {
          return { Authorization: `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` }
        }
      }
    ]
  }
})

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
