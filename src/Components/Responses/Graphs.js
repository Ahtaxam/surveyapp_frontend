import React, { useCallback, useState, useEffect } from "react";
import { Button, Card as MuiCard, CardContent } from "@mui/material";
import { styled, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import fileDownload from "js-file-download";
import ButtonGroup from "@mui/material/ButtonGroup";

import { authToken } from "../../utils/Authenticate";
import PATH from "../../Constants/Path";
import "./graph.css";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 *
 * @returns all questons with their summary in graphical form
 */
function Graphs() {
  const [responses, setResponses] = useState([]);
  const [Questions, setQuestions] = useState([]);
  const [isError, setIsError] = useState("");
  const { surveyId } = useParams();

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

  const downloadReport = () => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/download/${surveyId}`,
      headers: {
        config: `Bearer ${authToken()}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        toast.success("Report Downloaded Successfully");
        fileDownload(response.data, "report.csv");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    fetchResponses();
    fetchQuestions();
  }, [fetchResponses, fetchQuestions]);
  return (
    <div>
      {!isError && responses.length > 0 && (
        <Box textAlign="center">
          <Button variant="contained" onClick={downloadReport}>
            Download report
          </Button>
        </Box>
      )}
      {responses.length > 0 ? (
        <>
          <Card id="responses-heading">
            <CardContent>
              <Typography color="#575546" variant="h4" textAlign="center">
                {responses.length} responses
              </Typography>
            </CardContent>
          </Card>
          <div id="graphdiv">
            {Questions.map((question, index) => (
              <div key={index}>
                <Card>
                  <CardContent>
                    <Typography color="#575546">{question.title}</Typography>
                  </CardContent>
                  <ShowGraph
                    responses={responses}
                    Questions={Questions}
                    index={index}
                    type={question.type}
                    options={question.options}
                  />
                </Card>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Typography variant="h6" textAlign="center" color="red">
          {isError ? isError : "No responses yet"}
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

/**
 *
 * @param {object[]} responses
 * @param {Number} index
 * @param {String} type
 * @param {string[]} options
 * @param {String} activeButton
 * @returns {Component} render graph
 *
 */
function ShowGraph({ responses, index, Questions, type, options }) {
  const [activeButton, setActiveButton] = useState("Bar");
  const handleType = (value) => {
    setActiveButton(value);
  };
  let result = [];

  const colors = [
    "#5F6F94",
    "#A7D2CB",
    "#0F3460",
    "#42032C",
    "#A66CFF",
    "#FF6384",
    "#36A2EB",
    "#486f27",
    "#FFCE56",
    "#5F6F94",
  ];
  responses.forEach((response) => {
    result.push(...response.answers[index].options);
  });
  if (type === "multiplechoice") {
    const d = [];
    for (let i of options) {
      const index = result.indexOf(i);
      if (index < 0) {
        d.push(0);
      } else {
        d.push(result.filter((x) => x === i).length);
      }
    }
    const data = {
      labels: options,
      datasets: [
        {
          label: "Responses",
          data: d,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#486f27",
            "#FFCE56",
            "#5F6F94",
          ],
          borderWidth: 1,
        },
      ],
    };
    let optionss = {
      maintainAspectRation: false,
    };
    return (
      <div id="graph">
        {activeButton === "Bar" ? (
          <Bar data={data} options={optionss} />
        ) : (
          <Doughnut data={data} options={optionss} />
        )}
        <div className="btndiv">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              color={activeButton === "Bar" ? "secondary" : "primary"}
              onClick={() => handleType("Bar")}
            >
              Bar
            </Button>
            <Button
              color={activeButton === "Doughnut" ? "secondary" : "primary"}
              onClick={() => handleType("Doughnut")}
            >
              Doughnut
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }

  if (type === "text" || type === "number" || type === "checkbox") {
    let obj = {};
    for (let i of result) {
      if (obj[i]) {
        obj[i] += 1;
      } else {
        obj[i] = 1;
      }
    }
    const data = {
      labels: Object.keys(obj),
      datasets: [
        {
          label: "count",
          data: Object.values(obj),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor:
            colors[
              (Math.floor(Math.random() * colors.length),
              Math.floor(Math.random() * colors.length),
              Math.ceil(Math.random() * colors.length))
            ],
          borderWidth: 1,
        },
      ],
    };
    let optionss = {
      maintainAspectRation: false,
    };
    return (
      <div id="graph">
        {activeButton === "Bar" ? (
          <Bar data={data} options={optionss} />
        ) : (
          <Doughnut data={data} options={optionss} />
        )}
        <div className="btndiv">
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              color={activeButton === "Bar" ? "secondary" : "primary"}
              onClick={() => handleType("Bar")}
            >
              Bar
            </Button>
            <Button
              color={activeButton === "Doughnut" ? "secondary" : "primary"}
              onClick={() => handleType("Doughnut")}
            >
              Doughnut
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}
