import React from "react";
import { Link, Outlet } from "react-router-dom";

import MenuComponent from "./MenuComponent";
import PATH from "../../Constants/Path";

function Navbar() {
  return (
    <div className="dashboardnav">
      <p className="dashboardnav__heading">Nex Research</p>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to={PATH.JOIN}
          style={{
            color: "white",
            textDecoration: "none",
            position: "relative",
            top: "15px",
            right: "10px",
          }}
        >
          Join{" "}
        </Link>
        <MenuComponent id="navmenu" />
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
