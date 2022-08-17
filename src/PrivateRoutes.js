import React from "react";
import { Navigate } from "react-router-dom";
import PATH from "./Path";

function PrivateRoutes({ component: Component, ...restOfProps }) {
  const token = document.cookie.split("=")[1];
  if (!token) {
    return <Navigate to={PATH.login} />;
  } else {
    return <Component />;
  }
}

export default PrivateRoutes;
