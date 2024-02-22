import CircularProgress from '@mui/material/CircularProgress';
import loadingStyles from '../styles/loading.module.scss';

// A basic loading component using MUI

const Loading = () => {
  return (
    <div className={loadingStyles.wrapper}>
      <CircularProgress className={loadingStyles.animation} />
      <div className={loadingStyles.text}>Loading...</div>
    </div>
  );
};

export default Loading;
