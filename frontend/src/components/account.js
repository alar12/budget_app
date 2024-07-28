import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Paper, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Navbar from './navbar';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  form: {
    marginBottom: theme.spacing(2),
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  balance: {
    marginBottom: theme.spacing(2),
  },
}));

const Account = () => {
  const classes = useStyles();
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', amount: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:5000/api/transactions/${editId}`
      : 'http://localhost:5000/api/transactions';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const updatedTransaction = await response.json();
        setTransactions((prev) =>
          isEditing
            ? prev.map((t) => (t._id === editId ? updatedTransaction : t))
            : [...prev, updatedTransaction]
        );
        setIsEditing(false);
        setEditId(null);
        setForm({ title: '', description: '', amount: '' });
      } else {
        console.error('Failed to save transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (transaction) => {
    setForm({ title: transaction.title, description: transaction.description, amount: transaction.amount });
    setIsEditing(true);
    setEditId(transaction._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0).toFixed(2);
  };

  useEffect(() => {
    const updateDisposableIncome = async () => {
      try {
        const newDisposableIncome = calculateBalance();

        const response = await fetch('http://localhost:5000/api/disposable-income', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: newDisposableIncome }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Disposable income updated:', data);
        } else {
          console.error('Failed to update disposable income');
        }
      } catch (error) {
        console.error('Failed to update disposable income:', error);
      }
    };

    updateDisposableIncome();
  }, [transactions]);

  return (
    <div>
      <Navbar /> {/* Include the Navbar here */}
      <Container className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Account Transactions
        </Typography>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.balance}>
            Current Balance: ${calculateBalance()}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button className={classes.button} type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? 'Update Transaction' : 'Add Transaction'}
            </Button>
          </form>
        </Paper>
        {transactions.map((transaction) => (
          <Paper key={transaction._id} className={classes.paper}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{transaction.title}</Typography>
                <Typography>Description: {transaction.description}</Typography>
                <Typography>Amount: ${transaction.amount}</Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.actions}>
                <IconButton onClick={() => handleEdit(transaction)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(transaction._id)}>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Container>
    </div>
  );
};

export default Account;
