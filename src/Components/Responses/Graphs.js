import React, { useCallback, useState, useEffect } from "react";
import { Button, Card as MuiCard, CardContent } from "@mui/material";
import { styled, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";

import ShowGraph from "./ShowGraph";
import { authToken } from "../../utils/Authenticate";
import PATH from "../../Constants/Path";
import "./graph.css";

/**
 *
 * @returns all questions with their summary in graphical form
 */
function Graphs() {
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [surveyName, setSurveyName] = useState("");
  const [isError, setIsError] = useState("");
  const { surveyId } = useParams();

  const fetchResponses = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${PATH.RESPONSES}/${surveyId}`, {
        headers: {
          config: `Bearer ${authToken()}`,
        },
      })
      .then((response) => {
        setResponses(response.data);
      })
      .catch((error) => {
        setIsError(error.response.data);
      });
  }, [surveyId]);

  const fetchQuestions = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}/${surveyId}`, {
        headers: {
          config: `Bearer ${authToken()}`,
        },
      })
      .then((response) => {
        setSurveyName(response.data.name);
        setQuestions(response.data.questions);
      })
      .catch((error) => {});
  }, [surveyId]);

  const downloadReport = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/download/${surveyId}`, {
        headers: {
          config: `Bearer ${authToken()}`,
        },
      })
      .then((response) => {
        toast.success("Report Downloaded");
        fileDownload(response.data, `${surveyName}.csv`);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    fetchResponses();
    fetchQuestions();
  }, [fetchResponses, fetchQuestions]);
  return (
    <div>
      {!isError && responses.length > 0 && (
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button variant="contained" onClick={downloadReport}>
            Download report
          </Button>
        </Box>
      )}
      {!isError ? (
        <div>
          <>
            <div>
              <Card id="responses-heading">
                <CardContent>
                  <Typography color="#575546" variant="h4" textAlign="center">
                    {responses.length} responses
                  </Typography>
                </CardContent>
              </Card>
              <div id="graphdiv">
                {questions.map((question, index) => (
                  <div key={index}>
                    <Card>
                      <CardContent>
                        <Typography color="#575546">
                          {question.title}
                        </Typography>
                      </CardContent>
                      <ShowGraph
                        responses={responses}
                        questions={questions}
                        index={index}
                        type={question.type}
                        options={question.options}
                      />
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      ) : (
        <Typography variant="h6" textAlign="center" color="red">
          {isError}
        </Typography>
      )}
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

const Card = styled(MuiCard)({
  margin: "1rem",
  padding: "1rem",
});

export default Graphs;
