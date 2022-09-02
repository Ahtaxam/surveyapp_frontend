import React, { useCallback, useEffect, useState } from "react";
import { Button } from "@mui/material";

import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import "./dashbord.css";
import PATH from "../../Constants/Path";
import Navbar from "../Navbar/Navbar";
import { authToken } from "../../utils/Authenticate";
import UserSurveys from "./UserSurveys";

function DashBoard() {
  const [userSurveys, setUserSurveys] = useState([]);
  const [otherSurveys, setOtherSurveys] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [isError, setIsError] = useState("");

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };
  const navigate = useNavigate();
  const createSurvey = () => {
    navigate(PATH.SURVEY);
  };

  const fetchSurvey = useCallback(() => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}`,
      headers: {
        config: `Bearer ${authToken()}`,
      },
    };
    axios
      .request(options)
      .then((response) => {
        setUserSurveys(response.data);
      })
      .catch((error) => {
        setIsError(error.message);
      });
  }, []);

  const fetchOtherSurvey = useCallback(() => {
    const options = {
      method: "GET",
      url: `${process.env.REACT_APP_BASE_URL}/otherSurveys`,
      headers: {
        config: `Bearer ${authToken()}`,
      },
    };
    axios

      .request(options)
      .then((response) => {
        setOtherSurveys(response.data);
      })
      .catch((error) => {
        setIsError(error.message);
      });
  }, []);

  const handleClose = (message) => {
    setOpen(false);
    if (message === "agree") {
      const options = {
        method: "DELETE",
        url: `${process.env.REACT_APP_BASE_URL}${PATH.SURVEY}/${deleteId}`,
        headers: {
          config: `Bearer ${authToken()}`,
        },
      };
      axios
        .request(options)
        .then((response) => {
          toast.success(response.data.message);
          fetchSurvey();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const copyPath = (index) => {
    const path = `${window.location.origin}${PATH.JOINSURVEY}/${index}`;
    navigator.clipboard.writeText(path);
  };

  useEffect(() => {
    fetchSurvey();
    fetchOtherSurvey();
  }, [fetchSurvey, fetchOtherSurvey]);

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

      <UserSurveys
        createdSurvey={userSurveys}
        otherSurveys={otherSurveys}
        isError={isError}
        handleClose={handleClose}
        open={open}
        handleClickOpen={handleClickOpen}
        fullScreen={fullScreen}
        copyPath={copyPath}
      />

      <ToastContainer />
    </div>
  );
}

export default DashBoard;
