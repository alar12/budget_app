import { render, screen, act } from '@testing-library/react';
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

  test('sets isLoggedIn to true if valid token is present in localStorage', () => {
    const tokenData = {
      token: 'dummy-token',
      expiration: Date.now() + 3600000 // Valid for 1 hour
    };
    localStorage.setItem('token', JSON.stringify(tokenData));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Logged In')).toBeInTheDocument();
  });

  test('sets isLoggedIn to false if expired token is present in localStorage', () => {
    const tokenData = {
      token: 'expired-token',
      expiration: Date.now() - 3600000 // Expired 1 hour ago
    };
    localStorage.setItem('token', JSON.stringify(tokenData));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Logged Out')).toBeInTheDocument();
  });

  test('login sets isLoggedIn to true and stores token in localStorage', () => {
    const token = 'new-token';
    const metadata = { user: 'test-user' };

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ login }) => (
            <button onClick={() => login(token, metadata)}>Login</button>
          )}
        </AuthContext.Consumer>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText('Login').click();
    });

    expect(screen.getByText('Logged In')).toBeInTheDocument();
    expect(localStorage.getItem('token')).not.toBeNull();
  });

  test('logout sets isLoggedIn to false and removes token from localStorage', () => {
    const tokenData = {
      token: 'dummy-token',
      expiration: Date.now() + 3600000
    };
    localStorage.setItem('token', JSON.stringify(tokenData));

    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {({ logout }) => (
            <button onClick={() => logout()}>Logout</button>
          )}
        </AuthContext.Consumer>
        <TestComponent />
      </AuthProvider>
    );

    act(() => {
      screen.getByText('Logout').click();
    });

    expect(screen.getByText('Logged Out')).toBeInTheDocument();
    expect(localStorage.getItem('token')).toBeNull();
  });
});
