const SingleNotice = ({ notice }) => {
  const date = new Date(notice.publicationDate.seconds).toLocaleString();

  return (
    <tr>
      <td>{notice.title}</td>
      <td>{date}</td>
      <td>{notice.content}</td>
    </tr>
  );
};

export default SingleNotice;
