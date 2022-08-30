import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import PATH from "../../Constants/Path";
import "./join.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Join() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const tokenName = "expressToken";
  const authToken = document.cookie.match(
    new RegExp("(^| )" + tokenName + "=([^;]+)")
  )[2];

  // function if check that given survey id is valid or not if valid then fetch survey details and redirect to survey page
  const authenticateSurvey = () => {
    if (id.length === 0) {
      toast.error("Please enter a valid survey id");
      return;
    }

    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.JOIN}/${id}`,
      headers: {
        config: `Bearer ${authToken}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        navigate(PATH.JOINSURVEY + "/" + id);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  //  onpress enter key handle survey authenticate function
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      authenticateSurvey();
    }
  };
  // render function
  return (
    <div>
      <Navbar />
      <Typography
        variant="h4"
        style={{ textAlign: "center", padding: "20px", color: "#2196f3" }}
      >
        Join Survey
      </Typography>

      <section className="searchsurvey">
        <div>
          <TextField
            id="searchsurvey__input"
            variant="standard"
            label="Join survey by id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div>
          <Button
            variant="contained"
            id="searchsurvey__button"
            onClick={authenticateSurvey}
          >
            Join
          </Button>
        </div>
      </section>

      <Link
        to={PATH.DASHBOARD}
        style={{
          textDecoration: "none",
          margin: "50px auto",
          display: "block",
          color: "#f50057",
          textAlign: "center",
        }}
      >
        Back to Dashboard
      </Link>
      <ToastContainer />
    </div>
  );
}

export default Join;
