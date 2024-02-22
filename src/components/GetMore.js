import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';

import getMoreStyles from '../styles/getMore.module.scss';

// Would like to show where you are in the results list with more time
const GetMore = ({ handleNext, handlePrevious }) => {
  return (
    <div className={getMoreStyles.wrapper}>
      <button onClick={handlePrevious} aria-label='Previous notices'>
        <FaChevronLeft />
      </button>
      <button onClick={handleNext} aria-label='Next notices'>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default GetMore;
