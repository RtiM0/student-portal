import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify, { Auth } from 'aws-amplify';

const root = ReactDOM.createRoot(document.getElementById('root'));
Amplify.configure({
  Auth: {
    region: 'ap-south-1',
    userPoolId: process.env.REACT_APP_USERPOOLID,
    userPoolWebClientId: process.env.REACT_APP_CLIENTID,
    mandatorySignIn: true,
    oauth: {
      domain: 'studentportal.auth.ap-south-1.amazoncognito.com',
      scope: ['email', 'openid', 'phone', 'aws.cognito.signin.user.admin'],
      redirectSignIn: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_ENDPOINT : 'http://localhost:3000',
      redirectSignOut: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_ENDPOINT : 'http://localhost:3000',
      responseType: 'code',
    },
    cookieStorage: {
      domain: process.env.NODE_ENV === 'production' ? "studentportal.shakirmustafa.com" : "localhost",
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
        region: 'ap-south-1',
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
