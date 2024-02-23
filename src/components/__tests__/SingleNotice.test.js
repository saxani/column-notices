import { render, screen } from '@testing-library/react';
import SingleNotice from '../SingleNotice';

function renderComponent() {
  const tBody = document.createElement('tbody');
  const time = { seconds: 1707177600, nanoseconds: 0 };
  const notice = {
    title: 'Notice title',
    publicationDate: time,
    content: 'Some content about the notice',
  };

  render(<SingleNotice notice={notice} />, {
    container: document.body.appendChild(tBody),
  });
}

test('shows a row of data', () => {
  renderComponent();

  const cells = screen.getAllByRole('cell');
  expect(cells).toHaveLength(3);
});

test('make sure date is human readable', () => {
  const time = new Date(1707177600).toLocaleString();
  renderComponent();

  const cells = screen.getAllByRole('cell');

  expect(cells[1].textContent).toEqual(time);
});
