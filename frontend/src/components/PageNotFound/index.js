import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import ChevronRight from '@mui/icons-material/ChevronRight';

const PageNotFound = () => {
  return (
    <article
      style={{
        margin: "200px auto",
        width: "100%",
        maxWidth: "600px",
        display: "flex",
        flexWrap: 'wrap'
      }}
    >
      <div
        style={{ flex: "0 0 50%", display: "grid", alignItems: "center" }}
        className="left-side"
      >
        <h1 style={{ fontSize: "5em" }}>
          <i>404</i>
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          flexBasis: "40%",
        }}
        className="right-side"
      >
        <h2>Oops!</h2>
        <b>Page Not Found</b>
        <Button
          startIcon={<ChevronRight />}
          to="/"
          LinkComponent={Link}
        >
          Visit Our Homepage
        </Button>
      </div>
    </article>
  );
};

export default PageNotFound;
