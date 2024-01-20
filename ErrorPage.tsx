import * as React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h3>An Error Occured</h3>
      <Link to="/">Return home</Link>
    </div>
  );
};

export default ErrorPage;
