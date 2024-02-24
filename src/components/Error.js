import Alert from '@mui/material/Alert';

// A basic error component, would need more time to understand Firestore errors and give useful information to the user

const Error = ({ text }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Alert severity='error'>{text}</Alert>
    </div>
  );
};

export default Error;
