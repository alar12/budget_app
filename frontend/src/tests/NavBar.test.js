import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
import Navbar from '../components/navbar';

test('renders Navbar for logged-in users', () => {
  const mockLogout = jest.fn();

  render(
    <Router>
      <AuthContext.Provider value={{ isLoggedIn: true, logout: mockLogout }}>
        <Navbar />
      </AuthContext.Provider>
    </Router>
  );

  // Check if navigation links are displayed
  expect(screen.getByText(/Home/i)).toBeInTheDocument();
  expect(screen.getByText(/Account/i)).toBeInTheDocument();
  expect(screen.getByText(/Savings Plan/i)).toBeInTheDocument();
  expect(screen.getByText(/Logout/i)).toBeInTheDocument();
});
