import React, { useCallback, useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

import axios from "axios";

import { authToken } from "../../utils/Authenticate";
import Progress from "../Progress/Progress";
import PATH from "../../Constants/Path";
import "./graph.css";
import QUESTIONS_TYPE from "../../Constants/QUESTIONS_TYPES";

function Individuals() {
  const [responses, setResponses] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [isError, setIsError] = useState("");
  const { surveyId } = useParams();
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const fetchResponses = useCallback(() => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.RESPONSES}/${surveyId}`,
      headers: {
        config: `Bearer ${authToken()}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        setIsError("you have no responses");
      });
  }, [surveyId]);

  const fetchQuestions = useCallback(() => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}/${surveyId}`,
      headers: {
        config: `Bearer ${authToken()}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((error) => {
        setIsError(error.message);
      });
  }, [surveyId]);

  useEffect(() => {
    fetchResponses();
    fetchQuestions();
  }, [fetchResponses, fetchQuestions]);

  return (
    <div>
      <Card id="individualHeading">
        <CardContent style={{ margin: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={2}>
              <Pagination
                color="primary"
                count={responses.length}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </div>
        </CardContent>
      </Card>

      <div className="individualquestions">
        {Questions.length > 0 ? (
          Questions.map((question, index) => {
            return (
              <div key={index}>
                <Card
                  style={{
                    marginTop: "20px",
                    borderLeft: "2px solid blue",
                    borderRadius: "8px",
                  }}
                >
                  <CardContent>
                    <Typography variant="p" color="#f50039">
                      {question.title}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Options
                      options={question.options}
                      page={page}
                      selectedType={question.type}
                      responses={responses}
                      index={index}
                    />
                  </CardContent>
                </Card>
              </div>
            );
          })
        ) : (
          <Progress />
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          marginBottom: "40px",
        }}
      >
        <Link
          to={PATH.DASHBOARD}
          style={{
            textDecoration: "none",
            color: "#f50057",
            border: "1px solid #f50057",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Individuals;

function Options({ selectedType, page, responses, index }) {
  return (
    <div>
      {selectedType === QUESTIONS_TYPE.TEXT ||
      selectedType === QUESTIONS_TYPE.NUMBER ? (
        <p>{responses[page - 1]?.answers[index].options[0]}</p>
      ) : null}

      {selectedType === QUESTIONS_TYPE.CHECKBOX ||
      selectedType === QUESTIONS_TYPE.MULTIPLE_CHOICE ? (
        <div>
          {responses[page - 1]?.answers[index].options.map((option, index) => (
            <div key={index}>
              <p>{option}</p>
              <br />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
