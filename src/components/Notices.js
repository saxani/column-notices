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

import Loading from './Loading';
import Error from './Error';
import SearchBar from './SearchBar';
import NoticeList from './NoticeList';
import GetMore from './GetMore';

import noticeStyles from '../styles/notices.module.scss';

/* This component has gotten too massive and if I had more time, I'd be splitting this into helper functions, but the async data fetching and state updating gets a bit more complex */

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [lastVisible, setLastVisible] = useState();
  const [firstVisible, setFirstVisible] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Every 500ms while user is typing in searhbar, this will get called
  const handleSearch = (search) => {
    if (search == '') {
      // If user deletes full search term, display first ten results again
      getFirstNotices();
    } else {
      // A query for exact title matching...not ideal!
      const searchQuery = query(
        collection(db, 'notices'),
        where('title', '==', search),
        orderBy('publicationDate', 'desc'),
        limit(10)
      );

      getNotices(searchQuery);
    }
  };

  // Setting up a query for the next ten documents
  function handleNext() {
    const next = query(
      collection(db, 'notices'),
      orderBy('publicationDate', 'desc'),
      startAfter(lastVisible),
      limit(10)
    );

    getNotices(next);
  }

  // Setting up a query for the previous ten documents
  // Fun bug - this works well for going from page 2 to page 1...but page 3 wants to go to page 1
  // I've debugged and it seems like an issue with using endBefore() always wants to go to first in the list
  // But I'm sure it's user error somehow
  function handlePrevious() {
    const previous = query(
      collection(db, 'notices'),
      orderBy('publicationDate', 'desc'),
      endBefore(firstVisible),
      limit(10)
    );

    getNotices(previous);
  }

  // On page load, or on erasing search term, get first ten results
  function getFirstNotices() {
    const first = query(
      collection(db, 'notices'),
      orderBy('publicationDate', 'desc'),
      limit(10)
    );

    getNotices(first);
  }

  // After configuring the query in the above functions, get the data!
  async function getNotices(q) {
    try {
      const documentSnapshots = await getDocs(q);

      setFirstVisible(documentSnapshots.docs[0]);
      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

      const tempNotices = [];

      documentSnapshots.forEach((doc) => {
        tempNotices.push(doc.data());
      });

      setNotices(tempNotices);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }

  // On load get the first ten results
  useEffect(() => {
    setLoading(true);
    getFirstNotices();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={noticeStyles.wrapper}>
      <h1>My Notices</h1>
      {error && <Error />}
      <div className={noticeStyles.content}>
        <SearchBar handleSearch={handleSearch} />
        <NoticeList notices={notices} />
        <GetMore handleNext={handleNext} handlePrevious={handlePrevious} />
      </div>
    </div>
  );
};

export default Notices;