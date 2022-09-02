import React from "react";
import { CardContent, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Card as MuiCard } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import Progress from "../Progress/Progress";
import PATH from "../../Constants/Path";

function OtherSurveys({ otherSurveys, isError, copyPath }) {
  const getId = (index) => {
    copyPath(index);
  };
  return (
    <div className="createdSurveys">
      <Typography className="othersurveys-heading" variant="h4">
        Other Surveys
      </Typography>
      {!isError ? (
        <div>
          <div className="previousSurvey">
            {otherSurveys.length > 0 ? (
              otherSurveys.map((obj, index) => (
                <Card key={index}>
                  <CardContent>
                    <h4 className="previousSurvey__heading">{obj.name}</h4>
                  </CardContent>

                  <Link
                    style={{ textDecoration: "none" }}
                    to={`${PATH.JOINSURVEY}/${obj._id}`}
                  >
                    Take Survey
                  </Link>

                  <CardContent>
                    <div
                      style={{
                        margin: "0px 0px",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <input
                        type="text"
                        value={`${window.location.origin}${PATH.JOINSURVEY}/${obj._id}`}
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
                          onClick={() => getId(obj._id)}
                          style={{ position: "relative", left: "-8px" }}
                        >
                          <ContentCopyIcon></ContentCopyIcon>
                        </IconButton>
                      </Tooltip>
                    </div>
                  </CardContent>
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

export default OtherSurveys;
