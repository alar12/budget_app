import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from './AuthContext';

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
  const { isLoggedIn, logout } = useContext(AuthContext);

  let navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            My Budget App
          </Typography>
          {isLoggedIn ? (
            <>
              <Button color="inherit">
                <Link to="/home" className={classes.link}>
                  Home
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/savings-plan" className={classes.link}>
                  Savings Plan
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/account" className={classes.link}>
                  Account
                </Link>
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
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
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
