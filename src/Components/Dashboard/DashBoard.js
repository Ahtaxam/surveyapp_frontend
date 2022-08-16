import React from "react";
import MenuComponent from "./MenuComponent";
import dashbord from "./dashbord.css";
import { Button,  styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Card as MuiCard } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";

function DashBoard({ PreviousSurveys, recentSurvey }) {
  return (
    <div>
      <div className="dashboardnav">
        <p className="dashboardnav__heading">Nex Research</p>

        <MenuComponent />
      </div>

      <Button sx={{ m: 8 }} startIcon={<Add />} color="primary">
        Create Your Survey
      </Button>
      <Typography style={{ textAlign: "center" }} variant="h4">
        Your Created Surveys
      </Typography>
      <div className="recentSurvey">
        {recentSurvey.map((survey) => (
            <Card>
              <h4 style={{ marginTop: "5px" }}> {survey.name} </h4>
              <p className="recentSurvey__response">
                Responses: {survey.responses}{" "}
              </p>
              <div style={{ display: "flex", gap: "15px" }}>
                <Button variant="contained">Edit</Button>
                <Button variant="danger" startIcon={<DeleteIcon />}>
                  Delete
                </Button>
              </div>
            </Card>
        ))}
      </div>

      <hr style={{ width: "80%", marginLeft: "8%" }} />
      <div className="createdSurveys">
        <Typography style={{ textAlign: "center" }} variant="h4">
          Previous Surveys
        </Typography>
        <div className="previousSurvey">
          {PreviousSurveys.map((obj) => (
            <Card>
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
    </div>
  );
}
const Card = styled(MuiCard)`
  width: 280px;
  height: auto;
  padding: 40px;
`;
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
