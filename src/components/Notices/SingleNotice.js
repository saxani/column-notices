import { useNavigate } from 'react-router-dom';
import singleNoticeStyles from '../../styles/singleNotice.module.scss';

// Just rendering each row of data, an individual notice
const SingleNotice = ({ notice }) => {
  const navigate = useNavigate();
  const { seconds, nanoseconds } = notice.publicationDate;

  // There's gotta be a better way to convert Google's Timestamp to the Date object, but this works
  const dateCalculated = seconds * 1000 + nanoseconds / 1000000;

  // Getting the date to something human readable
  const date = new Date(dateCalculated).toLocaleString();

  const handleClick = () => {
    navigate(`/notice/${notice.id}`, {
      state: notice,
    });
  };

  return (
    <tr className={singleNoticeStyles.row} onClick={handleClick}>
      <td className={singleNoticeStyles.title}>{notice.title}</td>
      <td className={singleNoticeStyles.date}>{date}</td>
      <td className={singleNoticeStyles.contentWrapper}>
        <div className={singleNoticeStyles.content}>{notice.content}</div>
      </td>
    </tr>
  );
};

export default SingleNotice;
