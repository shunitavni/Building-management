import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from "./pages";
import LoginPage from "./pages/login";
import TenantsPage from './pages/tenants';

const useStyles = makeStyles({
  container: {
    marginTop: 30,
  },
});

function App() {
  const classes = useStyles();

  return (
    <Router>
      <Navbar />
      <Container maxWidth="md" className={classes.container}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/tenants" component={TenantsPage} />
          <Redirect to="/" />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
