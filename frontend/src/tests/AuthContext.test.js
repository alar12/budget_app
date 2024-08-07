import { render, screen } from '@testing-library/react';
import { AuthContext, AuthProvider } from '../components/AuthContext'; // Adjust the import path if necessary
import { useContext } from 'react';

const TestComponent = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return <div>{isLoggedIn ? 'Logged In' : 'Logged Out'}</div>;
};

describe('AuthProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test to avoid test interference
    localStorage.removeItem('token');
  });

  test('initially sets isLoggedIn to false if no token is present in localStorage', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Logged Out')).toBeInTheDocument();
  });

  test('sets isLoggedIn to true if token is present in localStorage', () => {
    localStorage.setItem('token', 'dummy-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Logged In')).toBeInTheDocument();
  });
});
