import React, { useCallback, useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import axios from "axios";

import Options from "./Options";
import { authToken } from "../../utils/Authenticate";
import PATH from "../../Constants/Path";
import "./graph.css";

function Individuals() {
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isError, setIsError] = useState("");
  const { surveyId } = useParams();
  const [page, setPage] = useState(1);
  const [userDeatils, setUserDetails] = useState({ name: "", email: "" });
  const handleChange = (event, value) => {
    setPage(value);
  };
  const fetchResponses = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${PATH.RESPONSES}/${surveyId}`, {
        headers: {
          config: `Bearer ${authToken()}`,
        },
      })
      .then((response) => {
        setResponses(response.data);
        axios
          .get(
            `${process.env.REACT_APP_BASE_URL}/responsedetail/${
              response.data[page - 1].userId
            }`
          )
          .then((response) => {
            setUserDetails({
              name: response.data.name,
              email: response.data.email,
            });
          });
      })
      .catch((error) => {
        setIsError("you have no responses");
      });
  }, [surveyId, page]);

  const fetchQuestions = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}/${surveyId}`, {
        headers: {
          config: `Bearer ${authToken()}`,
        },
      })
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

      <Card id="userDetail">
        <CardContent style={{ margin: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography variant="h6" style={{ color: "#d500f9", m: 2 }}>
              user Detail
            </Typography>
            <Typography color="primary">{userDeatils.name} </Typography>
            <Typography color="primary">{userDeatils.email} </Typography>
          </div>
        </CardContent>
      </Card>

      <div className="individualquestions">
        {questions &&
          questions.map((question, index) => {
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
          })}
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
