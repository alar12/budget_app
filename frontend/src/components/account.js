import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Button, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { jsPDF } from 'jspdf';
import Navbar from './navbar';

// Define styles using the styled API from MUI v5
const RootContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const FormContainer = styled('form')(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ActionsContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const BalanceText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const Account = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', amount: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const filterTransactions = () => {
    if (!startDate || !endDate) return transactions;
    return transactions.filter(transaction => {
      const date = new Date(transaction.date);
      return date >= startDate && date <= endDate;
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Transaction Statement', 10, 10);
    doc.text(`From: ${startDate?.toLocaleDateString()}`, 10, 20);
    doc.text(`To: ${endDate?.toLocaleDateString()}`, 10, 30);

    const filteredTransactions = filterTransactions();
    let y = 40;
    filteredTransactions.forEach(transaction => {
      doc.text(`Title: ${transaction.title}`, 10, y);
      doc.text(`Amount: $${transaction.amount}`, 10, y + 10);
      doc.text(`Description: ${transaction.description}`, 10, y + 20);
      y += 30;
    });

    doc.save('statement.pdf');
  };

  return (
    <div>
      <Navbar />
      <RootContainer>
        <Typography variant="h4" gutterBottom>
          Account Transactions
        </Typography>
        <StyledPaper>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Current Balance: ${calculateBalance()}
          </Typography>
          <FormContainer onSubmit={handleSubmit}>
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
            <ButtonStyled type="submit" variant="contained" color="primary" fullWidth>
              {isEditing ? 'Update Transaction' : 'Add Transaction'}
            </ButtonStyled>
          </FormContainer>
        </StyledPaper>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(date) => setStartDate(date)}
                renderInput={(props) => <TextField {...props} variant="outlined" fullWidth />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(date) => setEndDate(date)}
                renderInput={(props) => <TextField {...props} variant="outlined" fullWidth />}
              />
            </Grid>
          </Grid>
        </LocalizationProvider>

        <ButtonStyled
          variant="contained"
          color="secondary"
          fullWidth
          onClick={generatePDF}
        >
          Download Statement as PDF
        </ButtonStyled>

        {transactions.map((transaction) => (
          <StyledPaper key={transaction._id}>
            <Grid container>
              <Grid item xs={12} sm={8}>
                <Typography variant="h6">{transaction.title}</Typography>
                <Typography>Description: {transaction.description}</Typography>
                <Typography>Amount: ${transaction.amount}</Typography>
              </Grid>
              <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton onClick={() => handleEdit(transaction)}>
                  <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => handleDelete(transaction._id)}>
                  <DeleteIcon color="secondary" />
                </IconButton>
              </Grid>
            </Grid>
          </StyledPaper>
        ))}
      </RootContainer>
    </div>
  );
};

export default Account;
