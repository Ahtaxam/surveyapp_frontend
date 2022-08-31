import React from "react";
import { Link, Outlet } from "react-router-dom";

import MenuComponent from "./MenuComponent";
import PATH from "../../Constants/Path";

function Navbar() {
  return (
    <div className="dashboardnav">
      <p className="dashboardnav__heading">
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={PATH.DASHBOARD}
        >
          Nex Research
        </Link>
      </p>

      <div style={{ display: "flex", gap: "20px" }}>
        <p style={{position:"relative" , right:"20px" , top:"20px"}}>
          <Link
            to={PATH.JOIN}
            style={{
              color: "white",
              textDecoration: "none",
              border: "1px solid white",
              padding: "6px 16px",
              borderRadius:"5px"
            }}
          >
            Join{" "}
          </Link>
        </p>
        <MenuComponent id="navmenu" />
      </div>
      <Outlet />
    </div>
  );
}

export default Navbar;
