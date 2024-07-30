import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import Navbar from './navbar';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [disposableIncome, setDisposableIncome] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/savings');
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching savings plans:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchDisposableIncome = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/disposable-income');
        const data = await response.json();
        setDisposableIncome(data.amount);
      } catch (error) {
        console.error('Error fetching disposable income:', error);
      }
    };

    fetchPlans();
    fetchTransactions();
    fetchDisposableIncome();
  }, []);

  const planData = {
    labels: plans.map(plan => plan.goal),
    datasets: [
      {
        label: 'Monthly Savings Required',
        data: plans.map(plan => plan.amountToSavePerMonth),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const transactionData = {
    labels: transactions.map(transaction => transaction.title),
    datasets: [
      {
        label: 'Transaction Amounts',
        data: transactions.map(transaction => transaction.amount),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const planPieData = {
    labels: plans.map(plan => plan.goal),
    datasets: [
      {
        data: plans.map(plan => plan.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const transactionPieData = {
    labels: transactions.map(transaction => transaction.title),
    datasets: [
      {
        data: transactions.map(transaction => transaction.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const transactionTableRows = transactions.map(transaction => (
    <TableRow key={transaction._id}>
      <TableCell>{transaction.title}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.amount.toFixed(2)}</TableCell>
      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
    </TableRow>
  ));

  const planTableRows = plans.map(plan => (
    <TableRow key={plan._id}>
      <TableCell>{plan.goal}</TableCell>
      <TableCell>${plan.amount.toFixed(2)}</TableCell>
      <TableCell>${plan.amountToSavePerMonth.toFixed(2)}</TableCell>
      <TableCell>{plan.monthsRequired}</TableCell>
    </TableRow>
  ));

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Savings Plans Overview</Typography>
              <Bar data={planData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Savings Plans Distribution</Typography>
              <Pie data={planPieData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Transactions Overview</Typography>
              <Bar data={transactionData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Transactions Distribution</Typography>
              <Pie data={transactionPieData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Savings Plans Table</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Goal</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Monthly Savings</TableCell>
                      <TableCell>Months Required</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {planTableRows}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Transactions Table</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {transactionTableRows}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
