import { render, screen } from '@testing-library/react';
import LoginPage from '../components/login';

describe('LoginPage', () => {
  test('renders LoginPage component', () => {
    render(<LoginPage />);
    const loginElement = screen.getByText(/Email/i);
    expect(loginElement).toBeInTheDocument();
  });
});