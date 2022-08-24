import React, { useEffect, useState } from "react";
import { Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Card as MuiCard } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "./dashbord.css";
import PATH from "../../Constants/Path";
import Navbar from "../Navbar/Navbar";

function DashBoard({ PreviousSurveys }) {
  const [userSurveys, setUserSurveys] = useState();
  const navigate = useNavigate();
  const createSurvey = () => {
    navigate(PATH.SURVEY);
  };

  useEffect(() => {
    const authToken = document.cookie.split("=")[1];
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}`,
      headers: {
        token: authToken,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setUserSurveys(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <Button
        onClick={createSurvey}
        sx={{ m: 8 }}
        startIcon={<Add />}
        color="primary"
        variant="contained"
      >
        Create Your Survey
      </Button>
      <Typography className="createdsurveys-heading" variant="h4">
        Your Surveys
      </Typography>
      <div className="recentSurvey">
        {userSurveys && userSurveys.map((survey, index) => (
          <Card key={index}>
            <h4 style={{ marginTop: "5px" }}> {survey.name} </h4>
            <p className="recentSurvey__response">
              Responses: {survey.responses}{" "}
            </p>
            <div style={{ display: "flex", gap: "15px" }}>
              <Button variant="contained">Edit</Button>
              <Button
                variant="danger"
                startIcon={<DeleteIcon />}
                style={{ color: "red" }}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <hr style={{ width: "80%", marginLeft: "8%" }} />
      <div className="createdSurveys">
        <Typography className="othersurveys-heading" variant="h4">
          Other Surveys
        </Typography>
        <div className="previousSurvey">
          {PreviousSurveys.map((obj, index) => (
            <Card key={index}>
              <h4 className="previousSurvey__heading">{obj.name}</h4>
              <p className="previousSurvey__response">
                {" "}
                Responses: {obj.responses}{" "}
              </p>
              <Link to="/" style={{ textDecoration: "none" }}>
                Take Survey
              </Link>
            </Card>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
const Card = styled(MuiCard)`
  width: 280px;
  height: auto;
  padding: 30px;
`;
DashBoard.defaultProps = {
  PreviousSurveys: [
    { name: "Mental health", responses: 34 },
    { name: "Work From Home", responses: 12 },
    { name: "Student Politices", responses: 56 },
  ],

  userSurveys: [
    {
      name: "Work Place",
      responses: 89,
    },
  ],
};

export default DashBoard;
