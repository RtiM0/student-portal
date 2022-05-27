import React, { useEffect } from "react";
import Amplify, { Auth } from "aws-amplify";
import Home from "./Home.js"

function App() {

  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: 'ap-south-1',
        userPoolId: process.env.REACT_APP_USERPOOLID,
        userPoolWebClientId: process.env.REACT_APP_CLIENTID,
        mandatorySignIn: true,
        oauth: {
          domain: 'studentportal.auth.ap-south-1.amazoncognito.com',
          scope: ['email', 'openid', 'phone', 'aws.cognito.signin.user.admin'],
          redirectSignIn: 'http://localhost:3000',
          redirectSignOut: 'http://localhost:3000',
          responseType: 'code',
        },
        cookieStorage: {
          domain: "localhost",
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
  }, []);

  return (
    <div className="text-center">
      <Home />
    </div>
  );
}

export default App;
