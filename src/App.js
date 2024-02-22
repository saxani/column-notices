import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';

import './App.css';
import { db } from './db'; // Import this line to use the Firestore database connection

function App() {
  const [notices, setNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const noticesRef = collection(db, 'notices');

  async function getFilteredNotices() {
    setLoading(true);

    const q = query(
      noticesRef,
      where('title', '==', 'Community Garden Allotment Renewal')
    );

    const querySnapshot = await getDocs(q);
    const tempNotices = [];

    querySnapshot.forEach((doc) => {
      tempNotices.push(doc.data());
    });

    setFilteredNotices(tempNotices);
    setLoading(false);
  }

  async function getAllNotices() {
    setLoading(true);

    const querySnapshot = await getDocs(collection(db, 'notices'));
    const tempNotices = [];

    querySnapshot.forEach((doc) => {
      tempNotices.push(doc.data());
    });
    setNotices(tempNotices);
    setLoading(false);
  }

  useEffect(() => {
    getAllNotices();
    getFilteredNotices();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>Filtered Notices</h3>
      {filteredNotices.map((notice) => (
        <div key={notice.title.replace(' ', '-')}>{notice.title}</div>
      ))}
      <h3>All Notices</h3>
      {notices.map((notice) => (
        <div key={notice.title.replace(' ', '-')}>{notice.title}</div>
      ))}
    </div>
  );
}

export default App;
