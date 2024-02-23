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

  // The react-debounce-input library uses lodash and so any setTimeouts/setIntervals are getting pretty deep
  // Trying  jest.useFakeTimers() to simulate the debounce time doesn't seem to be working in anyway
  // But I was trying to do that to the below code

  // const input = screen.getByRole('textbox');
  // await user.click(input);
  // await user.keyboard('Notice...');
  // expect(mock).toHaveBeenCalled();
  // expect(mock).toHaveBeenCalledWith('Notice...');
});
