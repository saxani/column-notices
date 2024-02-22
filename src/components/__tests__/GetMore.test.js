import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import GetMore from '../GetMore';

test('shows two buttons', () => {
  render(<GetMore />);

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(2);
});

test('calls previous and next when clicked', async () => {
  const mockPrevious = jest.fn();
  const mockNext = jest.fn();

  render(<GetMore handleNext={mockNext} handlePrevious={mockPrevious} />);

  const buttonPrevious = screen.getByLabelText(/previous/i);
  const buttonNext = screen.getByLabelText(/next/i);

  await user.click(buttonPrevious);
  await user.click(buttonNext);

  expect(mockPrevious).toHaveBeenCalled();
  expect(mockNext).toHaveBeenCalled();
});
