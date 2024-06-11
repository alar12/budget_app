import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField, Button } from '@material-ui/core';
import Navbar from './navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={3} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <TextField label="Username" variant="outlined" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" href='/forgot-password' color="secondary" fullWidth>
                  Forgot Password
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button component="a" href="/register" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
