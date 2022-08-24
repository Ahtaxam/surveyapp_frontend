import React from "react";
import { Outlet } from "react-router-dom";
import MenuComponent from "./MenuComponent";
import { Button } from "@mui/material";
function Navbar() {
  return (
    <div className="dashboardnav">
      <p className="dashboardnav__heading">Nex Research</p>

      <div style={{ display: "flex", gap: "20px" }}>
        <Button variant="outline" style={{ color: "white" }}>
          join{" "}
        </Button>
        <MenuComponent id="navmenu" />
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
