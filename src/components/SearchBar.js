// Easy to setup Debounce component as Lodash + state doesn't work correctly
import { DebounceInput } from 'react-debounce-input';

const SearchBar = ({ handleSearch }) => {
  const handleChange = (value) => {
    handleSearch(value);
  };

  return (
    <DebounceInput
      className='search'
      placeholder='Search Notices...'
      debounceTimeout={500}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};

export default SearchBar;
