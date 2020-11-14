import { CircularProgress, Container, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './components/Navbar';
import { AuthContext } from './context/auth';
import HomePage from "./pages";
import LoginPage from "./pages/login";
import SignUpPage from './pages/signup';
import TenantsPage from './pages/tenants';

const useStyles = makeStyles({
  container: {
    marginTop: 30,
  },
  loading: {
    display: 'grid',
    placeItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: 'absolute'
  }
});

function App() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState('');
  //const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    // Logged in
    if (
      localStorageToken &&
      expiryDate &&
      new Date(expiryDate) >= new Date()
    ) {
      setAuth(true);
      setToken(localStorageToken);
    }

    setLoading(false);
  }, [auth]);

  if (loading)
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );

  return (
    <AuthContext.Provider value={{ auth, setAuth, token, setToken }}>
      <Router>
        <Navbar />
        <Container maxWidth="md" className={classes.container}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignUpPage} />
            <Route
              path="/tenants"
              render={(routeProps) =>
                auth ? (
                  <TenantsPage {...routeProps} />
                ) : (
                    <Redirect to="/login" />
                  )
              }
            />
            <Redirect to="/" />
          </Switch>
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
