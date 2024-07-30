import { render, screen } from '@testing-library/react';
import Account from '../components/Account';

describe('Account', () => {
  test('renders Account component', () => {
    render(<Account />);
    const accountElement = screen.getByText(/Account/i);
    expect(accountElement).toBeInTheDocument();
  });
});