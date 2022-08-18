import { TextField } from "@mui/material";

import React from "react";

import "./createsurvey.css";
import SurveyQuestions from "./SurveyQuestions";
function CreateSurvey() {
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
          placeholder="Form description"
          multiline
          variant="standard"
        />
      </section>

      <section className="">
        <SurveyQuestions />
      </section>
    </div>
  );
}

export default CreateSurvey;
