import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import "./createsurvey.css";
import SurveyQuestions from "./SurveyQuestions";
import PATH from "../../Constants/Path";
import Navbar from "../Navbar/Navbar";
import QUESTION_TYPE from "../../Constants/QUESTIONS_TYPES";
import { validateSurveyQuestions } from "./validateSurveyQuestions";
import { toast, ToastContainer } from "react-toastify";

function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userForms, setUserForms] = useState([
    {
      title: "",
      type: QUESTION_TYPE.MULTIPLECHOICE,
      options: ["option1"],
    },
  ]);
  const navigate = useNavigate();
  const backToDashBoard = () => {
    navigate(PATH.DASHBOARD);
  };

  const submitSurvey = () => {
    const [titles, options] = validateSurveyQuestions(userForms);

    if (titles && options) {
      console.log(userForms);
      toast.success("Survey created successfully");
    } else {
      toast.error("Question must be valid");
    }
  };

  // this function is used to add question title to the survey
  const handleQuestion = (value, index) => {
    const userForm = [...userForms];
    userForm[index].title = value;
    setUserForms(userForm);
  };

  // this function set options selected type for each question
  const handleQuestionType = (selectedType, questionNo) => {
    const userForm = [...userForms];
    userForm[questionNo].type = selectedType;

    if (selectedType === QUESTION_TYPE.TEXT) {
      userForm[questionNo].options = ["option1"];
    } else if (selectedType === QUESTION_TYPE.NUMBER) {
      userForm[questionNo].options = ["option1"];
    }
    setUserForms(userForm);
  };

  // function to delete a question from survey
  const handleDeleteQuestion = (index) => {
    const userForm = [...userForms];
    userForm.splice(index, 1);
    setUserForms(userForm);
  };

  // function to add new question to survey
  const handleAddQuestion = () => {
    const userForm = [...userForms];
    userForm.push({
      title: "",
      type: QUESTION_TYPE.MULTIPLECHOICE,
      options: ["option1"],
    });
    setUserForms(userForm);
  };

  // function to add new option to a question
  const handleAddOption = (questionNo, length) => {
    const userForm = [...userForms];
    userForm[questionNo].options.push("option" + (length + 1));
    setUserForms(userForm);
  };

  //function to add a particular option value to a question
  const handleOptionValue = (values) => {
    const { value, index, cardNo } = values;
    const userForm = [...userForms];
    userForm[cardNo].options[index] = value;
    setUserForms(userForm);
  };

  // function to delete an option from a question
  const handleDeleteOption = (index, questionNo) => {
    const userForm = [...userForms];
    userForm[questionNo].options.splice(index, 1);
    setUserForms(userForm);
  };

  // function to copy a question from survey
  const copyQuestion = (QuestionIndex) => {
    const userForm = [...userForms];
    userForm.splice(QuestionIndex + 1, 0, {
      ...userForm[QuestionIndex],
    });

    userForm[QuestionIndex + 1].options = [...userForm[QuestionIndex].options];
    setUserForms(userForm);
  };

  return (
    <div>
      <Navbar />
      <section className="surveyheader">
        <input
          type="text"
          className="surveyheader__input"
          placeholder="UNTITLED SURVEY"
          value={title}
          onChange={(e) => setTitle(e.target.value.toUpperCase())}
        />
        <TextField
          id="filled-textarea"
          placeholder="Form Description"
          multiline
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </section>

      <section>
        <SurveyQuestions
          questions={userForms}
          handleQuestion={handleQuestion}
          handleQuestionType={handleQuestionType}
          handleAddOption={handleAddOption}
          handleOptionValue={handleOptionValue}
          handleDeleteOption={handleDeleteOption}
          handleDeleteQuestion={handleDeleteQuestion}
          handleAddQuestion={handleAddQuestion}
          copyQuestion={copyQuestion}
        />
      </section>
      <Button
        id="submit-button"
        style={{
          textAlign: "center",
          width: "180px",
          backgroundColor: "#f50057",
          color: "white",
        }}
        onClick={submitSurvey}
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
      <ToastContainer />
    </div>
  );
}

export default CreateSurvey;
