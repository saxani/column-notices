import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { FaRegWindowClose } from 'react-icons/fa';

import searchBarStyles from '../styles/searchBar.module.scss';

const Calendar = ({
  handleShowCal,
  showCal,
  handleDateChange,
  dateFrom,
  dateTo,
}) => {
  let value = showCal === 'from' ? dateFrom : dateTo;

  if (value === '') {
    value = dayjs();
  }

  const handleChange = (val) => {
    handleShowCal('');
    handleDateChange(showCal, val);
  };

  const handleClick = () => {
    handleShowCal('');
  };

  return (
    <div className={searchBarStyles.calendar}>
      <div className={searchBarStyles.calHeading}>
        {showCal}
        <FaRegWindowClose onClick={handleClick} />
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={value}
          onChange={(newValue) => handleChange(newValue)}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
