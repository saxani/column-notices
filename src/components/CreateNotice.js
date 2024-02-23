import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../helpers/db';

import Error from './Error';
import pageStyles from '../styles/page.module.scss';

const CreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // This should ideally have the state from the main page so it goes back to where the user is in the list
  // But that would take more time!
  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, 'notices'), {
        title: title,
        publicationDate: new Date(),
        content: content,
      });
      setError(false);
      navigate(-1);
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className={pageStyles.wrapper}>
      <div className={pageStyles.content}>
        <button className={pageStyles.button} onClick={handleBack}>
          <FaChevronLeft />
        </button>
        <h1>Create a new notice...</h1>
        {error && (
          <Error text='An error occured trying to save data, please try again' />
        )}
        <div>
          <input
            className={`${pageStyles.smallInput} ${pageStyles.input}`}
            placeholder='Enter a notice title...'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <textarea
            placeholder='Enter notice content...'
            className={`${pageStyles.largeInput} ${pageStyles.input}`}
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
        </div>
        {title && content && (
          <button className={pageStyles.button} onClick={handleSubmit}>
            Create Notice
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateNotice;
