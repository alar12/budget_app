import { render, screen } from '@testing-library/react';
import Register from '../components/register';

describe('Register', () => {
  test('renders Register component', () => {
    render(<Register />);
    const registerElement = screen.getByText(/REGISTER/i);
    expect(registerElement).toBeInTheDocument();
  });
});