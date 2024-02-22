import { collection, getDocs } from 'firebase/firestore';
import { db } from '../helpers/db'; // Import this line to use the Firestore database connection

export async function getAllNotices() {
  const querySnapshot = await getDocs(collection(db, 'notices'));
  const notices = [];

  querySnapshot.forEach((doc) => {
    notices.push(doc.data());
  });

  console.log(notices);
  return notices;
}
