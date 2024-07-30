import React, { useState, useEffect } from 'react';
import Navbar from './navbar';

const Home = () => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/forecast');
        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error('Failed to fetch forecasting data:', error);
      }
    };

    fetchForecastData();
  }, []);

  if (!forecastData) return <p>Loading...</p>;

  const { accountData, savingsPlanData } = forecastData;

  return (
    <div>
      <Navbar />
      <h2>Welcome to Home Page</h2>
      <p>This is the home page of our application.</p>

      <section>
        <h3>Forecasting Data</h3>
        <div>
          <h4>Account Data</h4>
          {/* Replace with actual data structure */}
          <pre>{JSON.stringify(accountData, null, 2)}</pre>
        </div>
        <div>
          <h4>Savings Plan Data</h4>
          {/* Replace with actual data structure */}
          <pre>{JSON.stringify(savingsPlanData, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
};

export default Home;
