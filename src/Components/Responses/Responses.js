import React, { useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { ToastContainer } from "react-toastify";

import ShowContent from "./ShowContent";
import Navbar from "../Navbar/Navbar";

/**
 *
 * @returns component to show the responses of a survey
 */
function Responses() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Navbar />
      <Typography variant="h6" textAlign="center" sx={{ m: 4 }} color="#575546">
        Survey Responses
      </Typography>

      <Box sx={{ width: "100%", bgcolor: "background.paper", m: 1 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Summary" />
          <Tab label="Individuals" />
        </Tabs>
      </Box>

      <ShowContent value={value} />
      <ToastContainer />
    </div>
  );
}

export default Responses;
