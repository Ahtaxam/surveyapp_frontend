import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Progress() {
  return (
    <Box sx={{ display: "flex" , justifyContent:"center" }}>
      <CircularProgress />
    </Box>
  );
}

export default Progress;
