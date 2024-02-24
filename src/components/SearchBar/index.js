// Easy to setup Debounce component as Lodash + state doesn't work correctly
import { DebounceInput } from 'react-debounce-input';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Calendar from './Calendar';
import DateInput from './DateInput';
import searchBarStyles from '../../styles/searchBar.module.scss';

// Passing in the function to actually do the searching for title matches
// Because of debounce, only called every 500ms
const SearchBar = ({ handleSearch, handleDateChange, dateFrom, dateTo }) => {
  const [showCal, setShowCal] = useState('');
  const navigate = useNavigate();

  const handleChange = (value) => {
    handleSearch(value);
  };

  const handleClick = () => {
    navigate(`/create-notice`);
  };

  const handleShowCal = (time) => {
    setShowCal(time);
  };

  return (
    <div className={searchBarStyles.wrapper}>
      <div className={searchBarStyles.leftSide}>
        <div
          className={`${searchBarStyles.inputWrapper} ${searchBarStyles.search}`}
        >
          <span className={searchBarStyles.icon}>
            <FaSearch />
          </span>
          <DebounceInput
            className={searchBarStyles.input}
            placeholder='Search Notices...'
            debounceTimeout={500}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
        <div className={searchBarStyles.dateWrapper}>
          <span>Filter by date: </span>
          <DateInput
            date={dateFrom}
            range={'from'}
            handleShowCal={handleShowCal}
            handleDateChange={handleDateChange}
            showCal={showCal}
          />
          <DateInput
            date={dateTo}
            range={'to'}
            handleShowCal={handleShowCal}
            handleDateChange={handleDateChange}
            showCal={showCal}
          />

          {showCal != '' && (
            <Calendar
              handleShowCal={handleShowCal}
              showCal={showCal}
              handleDateChange={handleDateChange}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />
          )}
        </div>
      </div>

      <button className={searchBarStyles.button} onClick={handleClick}>
        Create Notice
      </button>
    </div>
  );
};

export default SearchBar;
