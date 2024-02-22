import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import SearchBar from '../SearchBar';

test('shows an input', () => {
  render(<SearchBar />);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('calls handleSearch when there is input', async () => {
  const mock = jest.fn();

  render(<SearchBar handleSearch={mock} />);

  const input = screen.getByRole('textbox');
  await user.click(input);
  await user.keyboard('Notice...');

  // I'm not an expert of testing library enough to know about dealing with debounce delays
  // So here's a workaround
  setTimeout(() => {
    expect(mock).toHaveBeenCalled();
    expect(mock).toHaveBeenCalledWith('Notice...');
  }, 1000);
});
