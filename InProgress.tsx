import * as React from "react";
import { Link } from "react-router-dom";

const InProgress = () => {
  return (
    <div>
      <h3>In progress</h3>
      <Link to="/export">Return to export</Link>
    </div>
  );
};

export default InProgress;
