import { getDocs } from 'firebase/firestore';

// After configuring the query in the above functions, get the data!
export async function getNotices(
  q,
  handleOutOfData,
  handleNotices,
  handleError
) {
  try {
    const documentSnapshots = await getDocs(q);

    if (documentSnapshots.docs.length == 0) {
      handleOutOfData(true);
      return;
    }

    handleOutOfData(false);

    const tempNotices = [];

    documentSnapshots.forEach((doc) => {
      const notice = doc.data();
      notice.id = doc.id;
      tempNotices.push(notice);
    });

    handleNotices(tempNotices, documentSnapshots.docs);
  } catch (e) {
    handleError(true);
  }
}
