import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PATH from "./Path";
function PrivateRoutes() {
  const token = document.cookie.split("=")[1];
  return <div>{token ? <Outlet /> : <Navigate to={PATH.login} />}</div>;
}

export default PrivateRoutes;
