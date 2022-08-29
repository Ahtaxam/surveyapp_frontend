import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent } from "@mui/material";

import Progress from "../Progress/Progress";
import PATH from "../../Constants/Path";
import JoinOptions from "./JoinOptions";
import QUESTION_TYPES from "../../Constants/QUESTIONS_TYPES";
import Navbar from "../Navbar/Navbar.js";

function JoinSurvey() {
  const { surveyId } = useParams();
  const [name, setName] = useState("UNTITLED");
  const [description, setDescription] = useState("description");
  const [questions, setQuestions] = useState();
  const [answers, setAnswers] = useState([]);
  const tokenName = "expressToken";
  const authToken = document.cookie.match(
    new RegExp("(^| )" + tokenName + "=([^;]+)")
  )[2];

  const setSelectedoptions = (value, isChacked, index, questionNo, type) => {
    let obj = {
      title: "",
      options: [],
    };
    const newAnswers = [...answers];
    if (type === QUESTION_TYPES.MULTIPLE_CHOICE) {
      obj.title = questions[questionNo].title;
      obj.options.push(value);
      newAnswers[questionNo] = obj;
      setAnswers(newAnswers);
    }

    if (type === QUESTION_TYPES.CHECKBOX) {
      if (isChacked) {
        const newAnswers = [...answers];
        obj.title = questions[questionNo].title;
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

  const setTextValue = (value, questionNo) => {
    let obj = {
      title: "",
      options: [],
    };

    const newAnswer = [...answers];
    obj.title = questions[questionNo].title;
    obj.options.push(value);
    newAnswer[questionNo] = obj;
    setAnswers(newAnswer);
  };
  const setNumberValue = (value, questionNo) => {
    let obj = {
      title: "",
      options: [],
    };

    const newAnswer = [...answers];
    obj.title = questions[questionNo].title;
    obj.options.push(value);
    newAnswer[questionNo] = obj;
    setAnswers(newAnswer);
  };

  const handleSubmitAnswers = () => {
    console.log(answers);
  };

  useEffect(() => {
    setTimeout(() => {
      const options = {
        method: "GET",
        url: `${process.env.REACT_APP_BASE_URL}${PATH.JOIN}/${surveyId}`,
        headers: {
          config: `Bearer ${authToken}`,
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
          console.log(error.response.data);
        });
    }, 1000);
  }, [authToken, surveyId]);

  return (
    <div>
      <Navbar />
      <section className="joinsurveyheader">
        <h1>{name}</h1>
        <p>{description}</p>
      </section>
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
          }}
        >
          <Button variant="contained" onClick={handleSubmitAnswers}>
            Submit
          </Button>
          <Link
            to={PATH.DASHBOARD}
            style={{ textDecoration: "none", color: "#f73378" }}
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JoinSurvey;
