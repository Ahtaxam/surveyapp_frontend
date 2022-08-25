import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import PATH from "../../Constants/Path";
import error from "../../../src/Images/error.jpg";
import "./page.css";

function PageNotFound() {
  return (
    <>
      <div className="notfound">
        <h1 className="notfound__heading">FATAL ERROR 404</h1>
        <img src={error} alt="error" className="notfound__image" />
      </div>
      <Link to={PATH.DASHBOARD} variant="outlined" id="backtohomelink">
        Back to home
      </Link>
    </>
  );
}

export default PageNotFound;
