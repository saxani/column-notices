import { useState, useEffect } from 'react';
import { queryBuilder } from '../../helpers/queryBuilder';
import { getNotices } from '../../helpers/getNotices';

import Loading from '../Loading';
import Error from '../Error';
import SearchBar from '../SearchBar';
import NoticeList from './NoticeList';
import GetMore from '../GetMore';

import noticeStyles from '../../styles/notices.module.scss';

/* This component has gotten too massive and if I had more time, I'd be splitting this into helper functions, but the async data fetching and state updating gets a bit more complex */
const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [snapshots, setSnapshops] = useState({}); // Need to save first and last in a page in another format
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dateTo, setDateTo] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [search, setSearch] = useState('');
  const [outOfData, setOutOfData] = useState(false);

  // To update new notices, save the first and last snapshot for reference
  function handleNotices(data, allSnapshots) {
    setNotices(data);
    setSnapshops({
      first: allSnapshots[0],
      last: allSnapshots[allSnapshots.length - 1],
    });
    setLoading(false);
  }

  // If errors happen while retrieving info
  function handleError(status) {
    setError(status);
    setLoading(false);
  }

  // For out of bounds requests on the results
  // Also for when there is no search results
  function handleOutOfData(status) {
    setOutOfData(status);
  }

  // Every 500ms while user is typing in searchbar, this will get called
  const handleSearch = (newSearch) => {
    setSearch(newSearch);
  };

  // If dates get selected in the calendar (or deleted) this will fire
  const handleDateChange = (toFrom, time) => {
    if (toFrom == 'from') {
      setDateFrom(time);
    } else {
      setDateTo(time);
    }
  };

  // Setting up a query for the previous ten documents
  // Fun bug - this works well for going from page 2 to page 1...but page 3 wants to go to page 1
  // I've debugged and it seems like an issue with using endBefore() always wants to go to first in the list
  // But I'm sure it's user error somehow
  function handlePrevious() {
    const q = queryBuilder(search, dateTo, dateFrom, snapshots.first, null);
    getNotices(q, handleOutOfData, handleNotices, handleError);
  }

  // Setting up a query for the next ten documents
  function handleNext() {
    const q = queryBuilder(search, dateTo, dateFrom, null, snapshots.last);
    getNotices(q, handleOutOfData, handleNotices, handleError);
  }

  // On load get the first ten results
  useEffect(() => {
    setLoading(true);
    const q = queryBuilder(search, dateTo, dateFrom, null, null);
    getNotices(q, handleOutOfData, handleNotices, handleError);
  }, []);

  // When state of search terms and date range change, notices will get updated
  useEffect(() => {
    const q = queryBuilder(search, dateTo, dateFrom, null, null);
    getNotices(q, handleOutOfData, handleNotices, handleError);
  }, [dateFrom, dateTo, search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={noticeStyles.wrapper}>
      <h1>My Notices</h1>
      {error && <Error text='Error fetching data. Try refreshing...' />}
      <div className={noticeStyles.content}>
        <SearchBar
          handleSearch={handleSearch}
          handleDateChange={handleDateChange}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
        {outOfData && <Error text='No more notices!' />}

        <NoticeList notices={notices} />
        <GetMore handleNext={handleNext} handlePrevious={handlePrevious} />
      </div>
    </div>
  );
};

export default Notices;
