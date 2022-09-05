import React from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./dashbord.css";
import PATH from "../../Constants/Path";
import Navbar from "../Navbar/Navbar";
import UserSurveys from "./UserSurveys";
import OtherSurveys from "./OtherSurveys";

function DashBoard() {
  const navigate = useNavigate();
  const createSurvey = () => {
    navigate(PATH.SURVEY);
  };

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

      <UserSurveys />
      <hr style={{ width: "80%", marginLeft: "8%", marginTop: "50px" }} />
      <OtherSurveys />
      <ToastContainer />
    </div>
  );
}

export default DashBoard;
