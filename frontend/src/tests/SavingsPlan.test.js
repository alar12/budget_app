import { render, screen } from '@testing-library/react';
import SavingsPlan from '../components/SavingsPlan';

describe('SavingsPlan', () => {
  test('renders SavingsPlan component', () => {
    render(<SavingsPlan />);
    const savingsPlanElement = screen.getByText(/Savings/i);
    expect(savingsPlanElement).toBeInTheDocument();
  });
});