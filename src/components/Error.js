import Alert from '@mui/material/Alert';

// A basic error component, would need more time to understand Firestore errors and give useful information to the user

const Error = () => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Alert severity='error'>Error fetching data. Try refreshing...</Alert>
    </div>
  );
};

export default Error;
