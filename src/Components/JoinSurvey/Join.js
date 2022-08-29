import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import PATH from "../../Constants/Path";
import "./join.css";
import { useNavigate } from "react-router-dom";

function Join() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const tokenName = "expressToken";
  const authToken = document.cookie.match(
    new RegExp("(^| )" + tokenName + "=([^;]+)")
  )[2];
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
  return (
    <div>
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
            label="Search Survey"
            value={id}
            multiline
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <Button
            variant="contained"
            id="searchsurvey__button"
            onClick={authenticateSurvey}
          >
            Search
          </Button>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}

export default Join;
