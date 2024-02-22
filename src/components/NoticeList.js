import SingleNotice from './SingleNotice';

const NoticeList = ({ notices }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Publication Date</th>
          <th>Content</th>
        </tr>
      </thead>
      <tbody>
        {notices.length > 0 &&
          notices.map((notice) => (
            <SingleNotice
              notice={notice}
              key={notice.title.replace(' ', '-')}
            />
          ))}
      </tbody>
    </table>
  );
};

export default NoticeList;
