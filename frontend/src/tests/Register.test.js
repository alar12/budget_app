import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Register from '../components/register';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Adjust the path to where your AuthContext is defined

jest.mock('axios');

const mockContextValue = {
  isLoggedIn: false,
  login: jest.fn(),
  logout: jest.fn(),
};

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Register component', () => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </AuthContext.Provider>
    );
    const [registerButton] = screen.getAllByRole('button', { name: /Register/i });
    expect(registerButton).toBeInTheDocument();
  });

});
