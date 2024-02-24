import SingleNotice from './SingleNotice';
import noticeListStyles from '../../styles/noticeList.module.scss';

// Pretty straightforward table setup
// I am trying to style match this to the Column noties database I can see on the marketing tools
// There's an extra pixel of border added on tables because of the way they function which I would correct with more time
const NoticeList = ({ notices }) => {
  return (
    <table className={noticeListStyles.wrapper}>
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
