import { useLocation, useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import pageStyles from '../styles/page.module.scss';

const NoticeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const notice = location.state;
  const date = new Date(notice.publicationDate.seconds).toLocaleString();

  // This should ideally have the state from the main page so it goes back to where the user is in the list
  // But that would take more time!
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.content}>
        <button className={pageStyles.button} onClick={handleBack}>
          <FaChevronLeft />
        </button>
        <h1>{notice.title}</h1>
        <p>
          <span className={pageStyles.bold}>Date published: </span>
          {date}
        </p>
        <p>{notice.content}</p>
      </div>
    </div>
  );
};

export default NoticeDetails;
