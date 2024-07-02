import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();

  // Function to determine if current location is home
  const isHome = location.pathname === '/home';

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Budget App
          </Typography>
          
          {/* Conditional rendering based on current location */}
          {!isHome ? (
            <>
              <Button color="inherit">
                <Link to="/" className={classes.link}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/register" className={classes.link}>
                  Register
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/forgot-password" className={classes.link}>
                  Forgot Password
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link to="/home" className={classes.link}>
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/" className={classes.link}>
                  Logout
                </Link>
            </Button>
          </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
