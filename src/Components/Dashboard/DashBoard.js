import React from "react";
import MenuComponent from "./MenuComponent";
import dashbord from "./dashbord.css";
import { Button, styled } from "@mui/material";
import { Link } from "react-router-dom";
function DashBoard({ PreviousSurveys, recentSurvey }) {
  return (
    <div>
      <div className="dashboardnav">
        <p className="dashboardnav__heading">Nex Research</p>

        <MenuComponent />
      </div>

      <Button id="surveyButton" variant="outlined">
        Create Your Survey
      </Button>

      <div className="recentSurvey">
        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#6d1b7b",
          }}
        >
          recent Survey
        </p>
        <div className="recentSurveyDiv">
          {recentSurvey.map((survey) => (
            <div>
              <h4 style={{ marginTop: "5px" }}> {survey.name} </h4>
              <p className="recentSurvey__response">
                Responses: {survey.responses}{" "}
              </p>
              <Link to="/" style={{ textDecoration: "none" }}>
                Take Survey
              </Link>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ width: "80%", marginLeft: "8%" }} />
      <div className="createdSurveys">
        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#6d1b7b",
          }}
        >
          Previous Surveys
        </p>
        <div className="previousSurvey">
          {PreviousSurveys.map((obj) => (
            <div className="individualsurvey">
              <h4 className="individualsurvey__heading">{obj.name}</h4>
              <p className="individualsurvey__response">
                {" "}
                Responses: {obj.responses}{" "}
              </p>
              <Link to="/" style={{ textDecoration: "none" }}>
                Take Survey
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

DashBoard.defaultProps = {
  PreviousSurveys: [
    { name: "Mental health", responses: 34 },
    { name: "Work From Home", responses: 12 },
    { name: "Student Politices", responses: 56 },
  ],

  recentSurvey: [
    {
      name: "Work Place",
      responses: 89,
    },
  ],
};
export default DashBoard;
