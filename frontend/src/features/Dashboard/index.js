import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div>
      <button>Go to Category</button>
      <Link to="/category">Category</Link>
    </div>
  );
};
