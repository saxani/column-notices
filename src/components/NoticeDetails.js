import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { getDoc, doc } from 'firebase/firestore';

import Loading from './Loading';
import Error from './Error';
import { db } from '../helpers/db';
import pageStyles from '../styles/page.module.scss';

// Enhanced this so the data is getting retrieved via the url product ID number
// This is advantageous so someone can reach this page without needing to be on the main page
const NoticeDetails = () => {
  const [notice, setNotice] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  async function getNotice() {
    try {
      const docRef = doc(db, 'notices', id);
      const docSnap = await getDoc(docRef);
      setNotice(docSnap.data());
      setDate(
        new Date(docSnap.data().publicationDate.seconds).toLocaleString()
      );
    } catch (e) {
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getNotice();
  }, []);

  // This should ideally have the state from the main page so it goes back to where the user is in the list
  // But that would take more time!
  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.content}>
        {error && <Error text='Error fetching data. Try refreshing...' />}
        <button className={pageStyles.button} onClick={handleBack}>
          <FaChevronLeft />
        </button>
        {notice && <h1>{notice.title}</h1>}
        <p>
          <span className={pageStyles.bold}>Date published: </span>
          {date}
        </p>
        {notice && <p>{notice.content}</p>}
      </div>
    </div>
  );
};

export default NoticeDetails;
