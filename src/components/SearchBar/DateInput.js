import { FaTrash } from 'react-icons/fa';
import searchBarStyles from '../../styles/searchBar.module.scss';

const DateInput = ({
  date,
  range,
  handleShowCal,
  handleDateChange,
  showCal,
}) => {
  return (
    <div className={`${searchBarStyles.inputWrapper} ${searchBarStyles.date}`}>
      <input
        onChange={() => {}}
        className={searchBarStyles.dateInput}
        placeholder={range}
        value={date != '' ? new Date(date).toDateString() : ''}
        onClick={() => {
          handleShowCal(showCal === range ? '' : range);
        }}
      />
      <span
        className={`${searchBarStyles.icon} ${searchBarStyles.trash} `}
        onClick={() => handleDateChange(range, '')}
      >
        <FaTrash />
      </span>
    </div>
  );
};

export default DateInput;
