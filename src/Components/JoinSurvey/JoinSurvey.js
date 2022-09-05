import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import Progress from "../Progress/Progress";
import PATH from "../../Constants/Path";
import JoinOptions from "./JoinOptions";
import QUESTION_TYPES from "../../Constants/QUESTIONS_TYPES";
import Navbar from "../Navbar/Navbar.js";
import { validateSurveyResponse } from "./validateSurveyResponse";
import { authToken } from "../../utils/Authenticate";

function JoinSurvey() {
  const { surveyId } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState([]);
  const [isError, setIsError] = useState("");

  const navigate = useNavigate();

  // function to set value of multiplechoice questions and checkbox questions in answers array

  /**
   *
   * @param {Number} value
   * @param {Boolean} isChecked
   * @param {Number} index
   * @param {Number} questionNo
   * @param {String} type
   */
  const setSelectedoptions = (value, isChecked, index, questionNo, type) => {
    let obj = {
      questionId: "",
      options: [],
    };
    const newAnswers = [...answers];

    if (type === QUESTION_TYPES.MULTIPLE_CHOICE) {
      obj.questionId = questions[questionNo]._id;
      obj.options.push(questions[questionNo].options[index]);
      newAnswers[questionNo] = obj;
      setAnswers(newAnswers);
    }
    // this one is to handle checkbox logic if user check the option then it will add that option in array and if user uncheck the option then it will remove that option from array
    if (type === QUESTION_TYPES.CHECKBOX) {
      if (isChecked) {
        const newAnswers = [...answers];
        obj.questionId = questions[questionNo]._id;
        obj.options.push(
          value,
          ...(answers[questionNo]?.options ? answers[questionNo].options : [])
        );
        newAnswers[questionNo] = obj;
        setAnswers(newAnswers);
      } else {
        let newAnswer = [...answers];
        newAnswer[questionNo].options = newAnswer[questionNo].options.filter(
          (option) => option !== value
        );
        setAnswers(newAnswer);
      }
    }
  };

  // function to set value of text questions in answers array and store in state
  /**
   *
   * @param {String} value
   * @param {Number} questionNo
   */
  const setTextValue = (value, questionNo) => {
    let obj = {
      questionId: "",
      options: [],
    };

    const newAnswer = [...answers];
    obj.questionId = questions[questionNo]._id;
    obj.options.push(value);
    newAnswer[questionNo] = obj;
    setAnswers(newAnswer);
  };

  // function to set value of number questions in answers array and store in state
  /**
   *
   * @param {String} value
   * @param {Number} questionNo
   */
  const setNumberValue = (value, questionNo) => {
    let obj = {
      questionId: "",
      options: [],
    };

    const newAnswer = [...answers];
    obj.questionId = questions[questionNo]._id;
    obj.options.push(value);
    newAnswer[questionNo] = obj;
    setAnswers(newAnswer);
  };

  // function to handle submit button first check that user has answered all the questions or not if user has answered all the questions then it will call server to store data

  const handleSubmitAnswers = () => {
    const result = validateSurveyResponse(answers, questions);
    if (!result) {
      toast.error("Please answer all the questions");
      return;
    }
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.JOIN}`,
      data: {
        surveyId: surveyId,
        answers: answers,
      },
      headers: {
        config: `Bearer ${authToken()}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        toast.success(response.data.message, {
          icon: "🚀",
        });

        setTimeout(() => {
          navigate(PATH.DASHBOARD);
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // function to fetch survey data from server

  useEffect(() => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.JOIN}/${surveyId}`,
      headers: {
        config: `Bearer ${authToken()}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setName(response.data.name);
        setDescription(response.data.description);
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        setIsError(error.response.data);
      });
  }, [surveyId]);

  //render function
  return (
    <div>
      <Navbar />
      <section className="joinsurveyheader">
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
      {isError === "" ? (
        <div className="joinsurvey-questions">
          {questions ? (
            questions.map((question, index) => (
              <Card
                key={index}
                style={{ borderLeft: "3px solid blue", marginBottom: "40px" }}
              >
                <CardContent>
                  <p>{question.title}</p>
                </CardContent>
                <CardContent>
                  <JoinOptions
                    options={question.options}
                    type={question.type}
                    handleSelectedOptions={setSelectedoptions}
                    handleTextValue={setTextValue}
                    handleNumberValue={setNumberValue}
                    questionNo={index}
                  ></JoinOptions>
                </CardContent>
              </Card>
            ))
          ) : (
            <Progress />
          )}
        </div>
      ) : (
        <Typography variant="h6" style={{ textAlign: "center", color: "red" }}>
          {isError}
        </Typography>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        {isError === "" ? (
          <Button variant="contained" onClick={handleSubmitAnswers}>
            Submit
          </Button>
        ) : (
          ""
        )}
        <Link
          to={PATH.JOIN}
          style={{
            textDecoration: "none",
            color: "#f73378",
            border: "1px solid #f73378",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Back
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
}

export default JoinSurvey;
