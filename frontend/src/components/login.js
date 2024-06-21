import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Paper, TextField, Button } from '@material-ui/core';
import Navbar from './navbar';
import axios from 'axios';

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

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/AdminLogin', formData);
      console.log(response.data);
      // Handle successful login here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={classes.root}>
        <Container maxWidth="sm">
          <Paper className={classes.paper} elevation={3}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" fullWidth type="submit">
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
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
