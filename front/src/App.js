import { Container, makeStyles } from '@material-ui/core';
//import React, { useContext, useEffect, useState } from 'react';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';
import { AuthContext, authState } from './context/auth';
import HomePage from "./pages";
import LoginPage from "./pages/login";
import SignUpPage from './pages/signup';
import TenantsPage from './pages/tenants';

const useStyles = makeStyles({
  container: {
    marginTop: 30,
  },
});

function App() {
  const classes = useStyles();
  //const [auth, setAuth] = useState(false);
  //const { setAuth } = useContext(AuthContext);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const expiryDate = localStorage.getItem('expiryDate');

  //   // Logged in
  //   if (
  //     token && expiryDate && new Date(expiryDate) >= new Date()
  //   ) {
  //     // @TODO: set context to true
  //   }
  // }, []);

  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <Navbar />
        <Container maxWidth="md" className={classes.container}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route path="/tenants" component={TenantsPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
