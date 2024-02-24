import Notices from './Notices';
import NoticeDetails from './NoticeDetails';
import CreateNotice from './CreateNotice';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/notice/:id',
    element: <NoticeDetails />,
  },
  {
    path: '/create-notice',
    element: <CreateNotice />,
  },
  {
    path: '/',
    element: <Notices />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
