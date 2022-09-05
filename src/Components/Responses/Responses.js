import React, { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import ShowContent from "./ShowContent";

/**
 *
 * @returns component to show the responses of a survey
 */
function Responses() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(event.target.value);
  };
  return (
    <div>
      <Typography variant="h6" textAlign="center" sx={{ m: 4 }} color="#575546">
        Survey Responses
      </Typography>

      <Box sx={{ width: "100%", bgcolor: "background.paper", m: 2 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Summary" />
          <Tab label="Questions" />
          <Tab label="Individuals" />
        </Tabs>
      </Box>

      <ShowContent value={value} />
    </div>
  );
}

export default Responses;
