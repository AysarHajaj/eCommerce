import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <article style={{ padding: "100px" }}>
      <h1>Oops!</h1>
      <b>Page Not Found</b>
      <div style={{ marginTop: '15px' }}>
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default PageNotFound;
