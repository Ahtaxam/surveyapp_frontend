import React from "react";
import { Button, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Card as MuiCard } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import PATH from "../../Constants/Path";
import Progress from "../Progress/Progress";

function CreatedSurveys({
  createdSurvey: userSurveys,
  isError,
  handleClose,
  open,
  handleClickOpen,
  fullScreen,
  copyPath,
}) {
  const handleClickOpenLocal = (id) => {
    handleClickOpen(id);
  };
  const handleCloseLocal = (message) => {
    handleClose(message);
  };
  const getCardId = (index) => {
    copyPath(index);
  };

  return (
    <div>
      <Typography className="createdsurveys-heading" variant="h4">
        Your Surveys
      </Typography>
      {isError === "" ? (
        <div>
          <div className="recentSurvey">
            {userSurveys.length > 0 ? (
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
                        margin: "5px 10px",
                        outline: "none",
                        border: "1px solid #ccc",
                        padding: "0px 10px",
                        borderRadius: "5px",
                      }}
                      readOnly
                    />
                    <Tooltip title="Copy Link">
                      <IconButton
                        onClick={() => getCardId(survey._id)}
                        style={{ position: "relative", left: "-8px" }}
                      >
                        <ContentCopyIcon></ContentCopyIcon>
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
                      onClick={() => handleClickOpenLocal(survey._id)}
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
                      onClose={handleCloseLocal}
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
              ))
            ) : (
              <Progress />
            )}
          </div>
        </div>
      ) : (
        <Typography variant="h6" style={{ textAlign: "center", color: "red" }}>
          {isError}
        </Typography>
      )}
    </div>
  );
}

const Card = styled(MuiCard)`
  width: 280px;
  height: auto;
  padding: 30px;
  border-radius: 15px;
`;
export default CreatedSurveys;
