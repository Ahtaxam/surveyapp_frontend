import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import PATH from "../../Constants/Path";
import error from "../../../src/Images/error.jpg";
import "./page.css";

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="notfound">
        <h1 className="notfound__heading">FATAL ERROR 404</h1>
        <img src={error} alt="error" className="notfound__image" />
      </div>
      <Button
        variant="outlined"
        color="primary"
        id="backbutton"
        onClick={() => navigate(PATH.HOME)}
      >
        Back to home
      </Button>
    </>
  );
}

export default PageNotFound;
