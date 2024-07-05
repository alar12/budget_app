import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, LinearProgress } from '@material-ui/core';
import Navbar from './navbar';

const initialDisposableIncome = 1000; // Hardcoded disposable income

const SavingsPlan = () => {
  const [formData, setFormData] = useState({
    goal: '',
    amount: '',
    percentage: ''
  });

  const [plans, setPlans] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Get current month index (0-11)
  const [disposableIncome, setDisposableIncome] = useState(initialDisposableIncome);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    setPlans([...plans, newPlan]);
    setFormData({
      goal: '',
      amount: '',
      percentage: ''
    });
  };

  const updatePlan = () => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => {
        if (plan.currentMonth < plan.monthsRequired) {
          // Check if current month matches the planned completion month
          const isCurrentMonth = plan.currentMonth === currentMonth % plan.monthsRequired;
          if (isCurrentMonth) {
            let amountToSave = plan.amountToSavePerMonth;
            if (plan.currentMonth === plan.monthsRequired - 1) {
              // Last month: Adjust amount to save based on remaining goal amount
              amountToSave = plan.amount - plan.wallet; // Only save remaining amount needed
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
    setCurrentMonth(currentMonth + 1); // Move to the next month
  };

  // Function to simulate monthly updates (runs every second)
  const startMonthlyUpdates = () => {
    const interval = setInterval(() => {
      updatePlan();
    }, 1000); // Update every second to simulate monthly update

    return () => clearInterval(interval); // Clear interval on unmount
  };

  React.useEffect(() => {
    const handle = startMonthlyUpdates();
    return () => {
      clearInterval(handle);
    };
  }, []);

  // Function to render upcoming months in a calendar-like grid with abbreviated month names and current dates
  const renderMonthsGrid = (plan) => {
    const currentMonthIndex = new Date().getMonth();
    const currentDay = new Date().getDate(); // Get current date

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return (
      <Grid container spacing={2} justify="center">
        {Array.from({ length: plan.monthsRequired }, (_, i) => {
          const isCompleted = plan.currentMonth > i;
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
          <Typography variant="h5">Disposable Income: ${disposableIncome.toFixed(2)}</Typography>
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
            {renderMonthsGrid(plan)}
          </Paper>
        ))}
      </Container>
    </div>
  );
};

export default SavingsPlan;
