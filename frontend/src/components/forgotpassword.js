import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper, Grid, TextField, Button } from '@material-ui/core';
import Navbar from './navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send password reset email logic here
    console.log('Email submitted:', email);
    // Clear the email field after submission
    setEmail('');
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="sm" className={classes.root}>
        <Paper className={classes.paper} elevation={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2>Forgot Password</h2>
                <p>Enter your email to reset your password.</p>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Reset Password
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default ForgotPassword;
