import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { logOut } from '../api/auth';
import { AuthContext } from '../context/auth';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const { token, auth, setAuth, setToken } = useContext(AuthContext);

  const handleSignOut = () => {
    logOut(token);
    setAuth(false);
    setToken('');
    history.push('/');
  }

  let content;

  if (!auth) {
    content = (
      <>
        <nav>
          <MuiLink
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
            onClick={() => history.push('/signup')}
          >
            Sign Up
          </MuiLink>
        </nav>
        <Button
          href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
          onClick={() => history.push('/login')}
        >
          Login
        </Button>
      </>
    );
  } else {
    content = (
      <>
        <MuiLink
          variant="button"
          color="textPrimary"
          href="#"
          className={classes.link}
          onClick={() => history.push('/tenants')}
        >
          Tenants
        </MuiLink>
        <MuiLink
          variant="button"
          color="textPrimary"
          href="#"
          className={classes.link}
          onClick={handleSignOut}
        >
          Logout
        </MuiLink>
      </>
    );
  }

  return (
    <>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Shunit Company
          </Typography>
         {content} 
        </Toolbar>
      </AppBar>
    </>
  );
}