import singleNoticeStyles from '../styles/singleNotice.module.scss';

// Just rendering each row of data, an individual notice
const SingleNotice = ({ notice }) => {
  // Getting the date to something human readable
  const date = new Date(notice.publicationDate.seconds).toLocaleString();

  return (
    <tr>
      <td className={singleNoticeStyles.title}>{notice.title}</td>
      <td className={singleNoticeStyles.date}>{date}</td>
      <td className={singleNoticeStyles.contentWrapper}>
        <div className={singleNoticeStyles.content}>{notice.content}</div>
      </td>
    </tr>
  );
};

export default SingleNotice;
