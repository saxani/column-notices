async function getFilteredNotices() {
  const noticesRef = collection(db, 'notices');

  const q = query(
    noticesRef,
    where('title', '==', 'Community Garden Allotment Renewal')
  );

  const querySnapshot = await getDocs(q);
  const tempNotices = [];

  querySnapshot.forEach((doc) => {
    // tempNotices.push(doc.data());
  });

  // setFilteredNotices(tempNotices);
}
