import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

import "./createsurvey.css";
import SurveyQuestions from "./SurveyQuestions";
import PATH from "../../Path";

function CreateSurvey() {
  const navigate = useNavigate();
  const backToDashBoard = () => {
    navigate(PATH.dashboard);
  };
  return (
    <div>
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
          backgroundColor: "	#FF69B4",
          color: "white",
        }}
      >
        Save
      </Button>

      <Button
        id="back-button"
        style={{
          textAlign: "center",
          width: "180px",
          color: "white",
          backgroundColor: "#ef5350",
        }}
        onClick={backToDashBoard}
      >
        Back
      </Button>
    </div>
  );
}

export default CreateSurvey;
