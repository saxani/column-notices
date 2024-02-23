import { render, screen } from '@testing-library/react';
import NoticeList from '../NoticeList';

test('shows two rows of data and the headings', () => {
  const time = { seconds: 1707177600, nanoseconds: 0 };
  const notices = [
    {
      title: 'Notice title',
      publicationDate: time,
      content: 'Some content about the notice',
    },
    {
      title: 'Notice title 2',
      publicationDate: time,
      content: 'Some content about the second notice',
    },
  ];

  render(<NoticeList notices={notices} />);

  const rows = screen.getAllByRole('row');
  expect(rows).toHaveLength(3);
});
