import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  startAfter,
  endBefore,
  limit,
  getDocs,
  where,
} from 'firebase/firestore';
import { db } from '../helpers/db'; // Import this line to use the Firestore database connection

import SearchBar from './SearchBar';
import NoticeList from './NoticeList';

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();

  const handleSearch = (search) => {
    if (search == '') {
      getAllNotices();
    } else {
      const searchQuery = query(
        collection(db, 'notices'),
        where('title', '==', search),
        orderBy('publicationDate', 'desc'),
        limit(10)
      );

      getNotices(searchQuery);
    }
  };

  function handleNext() {
    const next = query(
      collection(db, 'notices'),
      orderBy('publicationDate', 'desc'),
      startAfter(lastVisible),
      limit(10)
    );

    getNotices(next);
  }

  function handlePrevious() {
    const previous = query(
      collection(db, 'notices'),
      orderBy('publicationDate', 'desc'),
      endBefore(firstVisible),
      limit(10)
    );

    getNotices(previous);
  }

  function getAllNotices() {
    const first = query(
      collection(db, 'notices'),
      orderBy('publicationDate', 'desc'),
      limit(10)
    );

    getNotices(first);
  }

  async function getNotices(q) {
    const documentSnapshots = await getDocs(q);

    setFirstVisible(documentSnapshots.docs[0]);
    setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

    const tempNotices = [];

    documentSnapshots.forEach((doc) => {
      tempNotices.push(doc.data());
    });
    setNotices(tempNotices);
  }

  useEffect(() => {
    getAllNotices();
  }, []);

  return (
    <div>
      <h1>My Notices</h1>
      <SearchBar handleSearch={handleSearch} />
      <NoticeList notices={notices} />
      <div>
        <button onClick={handlePrevious}>Previous</button>

        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Notices;
