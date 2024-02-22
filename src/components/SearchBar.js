// Easy to setup Debounce component as Lodash + state doesn't work correctly
import { DebounceInput } from 'react-debounce-input';
import { FaSearch } from 'react-icons/fa';

import searchBarStyles from '../styles/searchBar.module.scss';

// Passing in the function to actually do the searching for title matches
// Because of debounce, only called every 500ms
const SearchBar = ({ handleSearch }) => {
  const handleChange = (value) => {
    handleSearch(value);
  };

  return (
    <div className={searchBarStyles.wrapper}>
      <div className={searchBarStyles.inputWrapper}>
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
    </div>
  );
};

export default SearchBar;
