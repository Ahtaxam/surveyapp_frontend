import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./createsurvey.css";
import SurveyQuestions from "./SurveyQuestions";
import PATH from "../../Constants/Path";
import Navbar from "../Navbar/Navbar";

function CreateSurvey() {
  const navigate = useNavigate();
  const backToDashBoard = () => {
    navigate(PATH.DASHBOARD);
  };
  return (
    <div>
      <Navbar />
      <section className="surveyheader">
        <input
          type="text"
          className="surveyheader__input"
          placeholder="UNTITLED SURVEY"
        />
        <TextField
          id="filled-textarea"
          placeholder="Form Description"
          multiline
          variant="standard"
        />
      </section>

      <section>
        <SurveyQuestions />
      </section>
      <Button
        id="submit-button"
        style={{
          textAlign: "center",
          width: "180px",
          backgroundColor: "#f50057",
          color: "white",
        }}
      >
        Save
      </Button>

      <Button
        id="back-button"
        variant="outlined"
        style={{
          textAlign: "center",
          width: "180px",
          color: "#ab003c",
        }}
        onClick={backToDashBoard}
      >
        Back
      </Button>
    </div>
  );
}

export default CreateSurvey;
