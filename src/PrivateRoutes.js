import React from "react";
import { Navigate } from "react-router-dom";
import PATH from "./Constants/Path";

function PrivateRoutes({ component: Component, ...restOfProps }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={PATH.LOGIN} />;
  } else {
    return <Component />;
  }
}

export default PrivateRoutes;
