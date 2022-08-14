import React from "react";
import MenuComponent from "./MenuComponent";
import dashbord from "./dashbord.css";
import { Button } from "@mui/material";
function DashBoard() {
  return (
    <div>
      <div className="dashboardnav">
        <p className="dashboardnav__heading">Nex Research</p>
        <p className="dashboardnav__menu">
          <MenuComponent />
        </p>
      </div>

      <Button id="surveyButton" variant="outlined">
        Create Your Survey
      </Button>
    </div>
  );
}

export default DashBoard;
