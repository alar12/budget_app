import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [allocation, setAllocation] = useState(0);
  const [forecast, setForecast] = useState(null);

  const handleIncomeChange = (e) => setIncome(e.target.value);
  const handleSavingsGoalChange = (e) => setSavingsGoal(e.target.value);
  const handleAllocationChange = (e) => setAllocation(e.target.value);

  const addExpense = () => {
    setExpenses([...expenses, { amount: 0, frequency: 'monthly' }]);
  };

  const handleExpenseChange = (index, field, value) => {
    const newExpenses = expenses.slice();
    newExpenses[index][field] = value;
    setExpenses(newExpenses);
  };

  const calculateForecast = () => {
    const monthlyIncome = parseFloat(income);
    const totalMonthlyExpenses = expenses.reduce((total, expense) => {
      switch (expense.frequency) {
        case 'weekly':
          return total + parseFloat(expense.amount) * 4;
        case 'bi-weekly':
          return total + parseFloat(expense.amount) * 2;
        case 'monthly':
        default:
          return total + parseFloat(expense.amount);
      }
    }, 0);

    const disposableIncome = monthlyIncome - totalMonthlyExpenses;
    const savingsPerMonth = (disposableIncome * parseFloat(allocation)) / 100;
    const monthsToGoal = parseFloat(savingsGoal) / savingsPerMonth;

    setForecast(monthsToGoal.toFixed(2));
  };

  const saveBudget = async () => {
    try {
      const userId = "user-id-placeholder"; // Replace with actual user ID
      const response = await axios.post('/budget', {
        userId,
        income,
        expenses,
        savingsGoal,
        allocation,
      });

      console.log('Budget saved:', response.data);
    } catch (err) {
      console.error('Error saving budget:', err);
    }
  };

  return (
    <div className="home-container">
      <h1>Monthly Budget Forecast</h1>
      <div>
        <label>
          Monthly Income:
          <input type="number" value={income} onChange={handleIncomeChange} />
        </label>
      </div>
      <div>
        <h2>Expenses</h2>
        {expenses.map((expense, index) => (
          <div className="expense-item" key={index}>
            <label>
              Amount:
              <input
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  handleExpenseChange(index, 'amount', e.target.value)
                }
              />
            </label>
            <label>
              Frequency:
              <select
                value={expense.frequency}
                onChange={(e) =>
                  handleExpenseChange(index, 'frequency', e.target.value)
                }
              >
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
              </select>
            </label>
          </div>
        ))}
        <button onClick={addExpense}>Add Expense</button>
      </div>
      <div>
        <label>
          Savings Goal:
          <input
            type="number"
            value={savingsGoal}
            onChange={handleSavingsGoalChange}
          />
        </label>
      </div>
      <div>
        <label>
          Allocate % of Disposable Income:
          <input
            type="number"
            value={allocation}
            onChange={handleAllocationChange}
          />
        </label>
      </div>
      <button onClick={calculateForecast}>Calculate Forecast</button>
      {forecast && (
        <div className="forecast">
          <h2>Forecast</h2>
          <p>
            It will take {forecast} months to reach your savings goal if you
            allocate {allocation}% of your disposable income each month.
          </p>
        </div>
      )}
      <button onClick={saveBudget}>Save Budget</button>
    </div>
  );
}

export default Home;
