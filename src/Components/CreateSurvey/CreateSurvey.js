import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Switch from "@mui/material/Switch";

import "./createsurvey.css";
import SurveyQuestions from "./SurveyQuestions";
import PATH from "../../Constants/Path";
import Navbar from "../Navbar/Navbar";
import QUESTION_TYPE from "../../Constants/QUESTIONS_TYPES";
import { validateSurveyQuestions } from "./validateSurveyQuestions";

function CreateSurvey() {
  const [isPublic, setPublic] = useState(true);
  const [name, setName] = useState("UNTITLED SURVEY"); //survey title
  const [description, setDescription] = useState(""); //survey description
  const [userForms, setUserForms] = useState([
    {
      title: "",
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
      options: ["option1"],
    },
  ]);
  const tokenName = "expressToken";
  const navigate = useNavigate();
  const backToDashBoard = () => {
    navigate(PATH.DASHBOARD);
  };

  const submitSurvey = () => {
    const authToken = document.cookie.match(
      new RegExp("(^| )" + tokenName + "=([^;]+)")
    )[2];

    if (name.length === 0) {
      toast.error("Please Make Sure You Have A Title");
      return;
    }
    const [titles, options] = validateSurveyQuestions(userForms);

    if (titles && options) {
      const options = {
        method: "POST",
        url: `${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}`,
        headers: {
          config: `Bearer ${authToken}`,
        },
        data: {
          name: name,
          description: description,
          isPublic: isPublic,
          questions: userForms,
        },
      };

      axios
        .request(options)
        .then((response) => {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate(PATH.DASHBOARD);
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.message);
        });
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
  const handleQuestionType = (selectedType, questionNo, previous) => {
    const userForm = [...userForms];
    userForm[questionNo].type = selectedType;

    if (selectedType === QUESTION_TYPE.TEXT) {
      userForm[questionNo].options = [];
    } else if (selectedType === QUESTION_TYPE.NUMBER) {
      userForm[questionNo].options = [];
    } else if (
      ((selectedType === QUESTION_TYPE.CHECKBOX ||
        selectedType === QUESTION_TYPE.MULTIPLE_CHOICE) &&
        previous === QUESTION_TYPE.TEXT) ||
      previous === QUESTION_TYPE.NUMBER
    ) {
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
      type: QUESTION_TYPE.MULTIPLE_CHOICE,
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
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />
        <TextField
          id="filled-textarea"
          placeholder="Form Description"
          multiline
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <p className="switch-button">
          Public
          <Switch
            checked={isPublic}
            onChange={() => setPublic(!isPublic)}
            name="isPublic"
            color="secondary"
          />
        </p>
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
