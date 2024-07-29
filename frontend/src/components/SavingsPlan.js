import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import Navbar from './navbar';

const SavingsPlan = () => {
  const [formData, setFormData] = useState({
    goal: '',
    amount: '',
    percentage: ''
  });

  const [plans, setPlans] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Get current month index (0-11)
  const [disposableIncome, setDisposableIncome] = useState(null); // Initially null

  useEffect(() => {
    // Fetch disposable income from the server and set it
    const fetchDisposableIncome = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/disposable-income');
        const data = await response.json();
        setDisposableIncome(data.amount); // Adjust according to the response structure
      } catch (error) {
        console.error('Failed to fetch disposable income:', error);
      }
    };

    fetchDisposableIncome(); // Fetch disposable income on component mount

    const fetchPlans = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/savings');
        const data = await response.json();
        setPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    const interval = setInterval(fetchPlans, 6000); // Fetch plans every 6 seconds

    fetchPlans(); // Initial fetch for plans

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disposableIncome === null) {
      console.error('Disposable income is not available');
      return;
    }
    const amountToSavePerMonth = (disposableIncome * formData.percentage) / 100;
    const monthsRequired = Math.ceil(formData.amount / amountToSavePerMonth);

    const newPlan = {
      goal: formData.goal,
      amount: parseFloat(formData.amount),
      percentage: parseFloat(formData.percentage),
      amountToSavePerMonth,
      monthsRequired,
      currentMonth: 0,
      wallet: 0
    };

    try {
      const response = await fetch('http://localhost:5000/api/savings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlan),
      });

      if (response.ok) {
        const savedPlan = await response.json();
        setPlans([...plans, savedPlan]);
      } else {
        console.error('Failed to save the plan');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    setFormData({
      goal: '',
      amount: '',
      percentage: ''
    });
  };

  const handleAdvancePayment = async (planIndex) => {
    if (disposableIncome === null) {
      console.error('Disposable income is not available');
      return;
    }
    const updatedPlans = plans.map((plan, index) => {
      if (index === planIndex) {
        const amountToSavePerMonth = plan.amountToSavePerMonth;
        const updatedWallet = plan.wallet + amountToSavePerMonth;
        const updatedDisposableIncome = disposableIncome - amountToSavePerMonth;
        setDisposableIncome(updatedDisposableIncome);
        return { ...plan, currentMonth: plan.currentMonth + 1, wallet: updatedWallet };
      }
      return plan;
    });

    setPlans(updatedPlans);

    try {
      const response = await fetch(`http://localhost:5000/api/savings/${plans[planIndex]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlans[planIndex]),
      });

      if (!response.ok) {
        console.error('Failed to update the plan');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const updatePlan = () => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.currentMonth < plan.monthsRequired) {
          const isCurrentMonth = plan.currentMonth === currentMonth % plan.monthsRequired;
          if (isCurrentMonth) {
            let amountToSave = plan.amountToSavePerMonth;
            if (plan.currentMonth === plan.monthsRequired - 1) {
              amountToSave = plan.amount - plan.wallet;
            }

            const updatedWallet = plan.wallet + amountToSave;
            const updatedDisposableIncome = disposableIncome - amountToSave;
            setDisposableIncome(updatedDisposableIncome);

            return { ...plan, currentMonth: plan.currentMonth + 1, wallet: updatedWallet };
          }
        }
        return plan;
      })
    );
    setCurrentMonth(currentMonth + 1);
  };

  const startMonthlyUpdates = () => {
    const interval = setInterval(() => {
      updatePlan();
    }, 1000); // Update every second to simulate monthly update

    return () => clearInterval(interval);
  };

  useEffect(() => {
    const interval = startMonthlyUpdates();
    return () => interval(); // Cleanup interval on component unmount
  }, [updatePlan]);

  const renderMonthsGrid = (plan, planIndex) => {
    const currentMonthIndex = new Date().getMonth();
    const currentDay = new Date().getDate(); // Get current date

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
      <Grid container spacing={2} justify="center">
        {Array.from({ length: plan.monthsRequired }, (_, i) => {
          const isCompleted = plan.currentMonth >= i;
          const monthIndex = (currentMonthIndex + i) % 12; // Cycle through months starting from current month
          const date = new Date(new Date().getFullYear(), currentMonthIndex + i, currentDay).toLocaleDateString('en-US', {
            day: 'numeric'
          });

          return (
            <Grid key={i} item>
              <Paper
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  textAlign: 'center',
                  lineHeight: '80px',
                  backgroundColor: isCompleted ? 'green' : 'lightgray'
                }}
              >
                {monthNames[monthIndex]} {date}
              </Paper>
              {isCompleted && i === plan.currentMonth && (
                <Button variant="contained" color="secondary" onClick={() => handleAdvancePayment(planIndex)}>
                  Pay this
                </Button>
              )}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5">Log Savings Plan</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Savings Goal"
                  variant="outlined"
                  fullWidth
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Percentage of Disposable Income"
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit" fullWidth>
                  Add Plan
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h5">Disposable Income: ${disposableIncome !== null ? disposableIncome.toFixed(2) : 'Loading...'}</Typography>
        </Paper>
        {plans.map((plan, index) => (
          <Paper key={index} elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h5">{plan.goal}</Typography>
            <Typography>Goal Amount: ${plan.amount}</Typography>
            <Typography>Monthly Savings: ${plan.amountToSavePerMonth.toFixed(2)}</Typography>
            <Typography>Months Required: {plan.monthsRequired}</Typography>
            <Typography>Current Wallet Balance: ${plan.wallet.toFixed(2)}</Typography>
            <LinearProgress
              variant="determinate"
              value={(plan.currentMonth / plan.monthsRequired) * 100}
              style={{ margin: '20px 0' }}
            />
            {renderMonthsGrid(plan, index)}
          </Paper>
        ))}
      </Container>
    </div>
  );
};

export default SavingsPlan;
