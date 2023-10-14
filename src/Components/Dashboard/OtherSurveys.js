import React, { useState, useCallback, useEffect } from "react";
import { CardContent, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Card as MuiCard } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";

import PATH from "../../Constants/Path";
import { authToken } from "../../utils/Authenticate";

/**
 *
 * @returns all the surveys created by the others user
 */
function OtherSurveys() {
  const [content, setContent] = useState("Copy Link");
  const [otherSurveys, setOtherSurveys] = useState([]);
  const [isError, setIsError] = useState("");

  /**
   * @param {number} index
   */
  const getId = (index) => {
    setContent("Copied");
    const path = `${window.location.origin}${PATH.JOINSURVEY}/${index}`;
    navigator.clipboard.writeText(path);
  };
  const changeTitle = () => {
    setContent("Copy Link");
  };

  /**
   * @async  fetchSurvey
   * @return fetches all the surveys created by the other users
   */
  const fetchSurvey = useCallback(() => {
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

  useEffect(() => {
    fetchSurvey();
  }, [fetchSurvey]);
  return (
    <div className="createdSurveys">
      <Typography className="othersurveys-heading" variant="h4">
        Other Surveys
      </Typography>
      {!isError ? (
        <div>
          <div className="previousSurvey">
            {
              otherSurveys.map((obj, index) => (
                <Card key={index} onMouseLeave={changeTitle}>
                  <CardContent>
                    <h4 className="previousSurvey__heading">{obj.name}</h4>
                  </CardContent>

                  <Link to={`${PATH.JOINSURVEY}/${obj._id}`}>Take Survey</Link>

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
                      <Tooltip title={content}>
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
             }
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
