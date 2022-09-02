import React from "react";
import CreatedSurveys from "./CreatedSurveys";
import OtherSurveys from "./OtherSurveys";

function UserSurveys({
  createdSurvey,
  otherSurveys,
  isError,
  handleClose,
  open,
  handleClickOpen,
  fullScreen,
  copyPath,
}) {
  return (
    <div>
      <CreatedSurveys
        createdSurvey={createdSurvey}
        isError={isError}
        handleClose={handleClose}
        open={open}
        handleClickOpen={handleClickOpen}
        fullScreen={fullScreen}
        copyPath={copyPath}
      />
      <hr style={{ width: "80%", marginLeft: "8%", marginTop: "50px" }} />
      <OtherSurveys
        otherSurveys={otherSurveys}
        isError={isError}
        copyPath={copyPath}
      />
    </div>
  );
}

export default UserSurveys;
