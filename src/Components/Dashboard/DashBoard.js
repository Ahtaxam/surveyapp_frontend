import React, { useCallback, useEffect, useState } from "react";
import { Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Card as MuiCard } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import "./dashbord.css";
import PATH from "../../Constants/Path";
import Navbar from "../Navbar/Navbar";
import Progress from "../Progress/Progress";
import { authToken } from "../../utils/Authenticate";

function DashBoard({ PreviousSurveys }) {
  const [userSurveys, setUserSurveys] = useState();
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
    setTimeout(() => {
      fetchSurvey();
    }, 1000);
  }, [fetchSurvey]);

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
      {isError === "" ? (
        <div>
          {userSurveys ? (
            <div className="recentSurvey">
              {userSurveys &&
                userSurveys.map((survey, index) => (
                  <Card key={index}>
                    <h4 style={{ marginTop: "5px" }}> {survey.name} </h4>
                    <p className="recentSurvey__response">
                      Responses: {survey.response}{" "}
                    </p>
                    <div
                      style={{
                        margin: "10px 0px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <input
                        type="text"
                        value={`${window.location.origin}${PATH.JOINSURVEY}/${survey._id}`}
                        style={{
                          margin: "0px 10px",
                          outline: "none",
                          border: "1px solid #ccc",
                          padding: "0px 10px",
                          borderRadius: "5px",
                        }}
                        readOnly
                      />
                      <Tooltip title="Copy Link">
                        <IconButton onClick={() => copyPath(survey._id)}>
                          <ContentCopyIcon
                            style={{ position: "relative", left: "-10px" }}
                          ></ContentCopyIcon>
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div style={{ display: "flex", gap: "45px" }}>
                      <Button variant="contained">
                        <Link
                          style={{ textDecoration: "none", color: "white" }}
                          to={`${PATH.EDITSURVEY}/${survey._id}`}
                        >
                          Edit
                        </Link>
                      </Button>

                      <Button
                        onClick={() => handleClickOpen(survey._id)}
                        variant="danger"
                        startIcon={<DeleteIcon />}
                        style={{
                          color: "red",
                          border: "1px solid red",
                          borderRadius: "7px",
                        }}
                      >
                        Delete
                      </Button>
                      <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle
                          id="responsive-dialog-title"
                          style={{ color: "red" }}
                        >
                          {"Survey will be deleted ?"}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Are you sure you want to delete this survey?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions
                          style={{
                            display: "flex",
                            gap: "20px",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            autoFocus
                            variant="outlined"
                            onClick={() => handleClose("disagree")}
                          >
                            No
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() => handleClose("agree")}
                            autoFocus
                            style={{ backgroundColor: "#f44336" }}
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </Card>
                ))}
            </div>
          ) : (
            <Progress />
          )}
        </div>
      ) : (
        <Typography variant="h6" style={{ textAlign: "center", color: "red" }}>
          {isError}
        </Typography>
      )}
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
