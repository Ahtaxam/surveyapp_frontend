import React from "react";
import login from "./login.css";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
function Login() {
  return (
    <div>
      <div className="mainform">
        <div className="header">
          <LockIcon className="header__icon"></LockIcon>
          <h1 className="header__heading">Login </h1>
        </div>
        <form>
          <div className="form">
            <div className="form__div">
              <label className="form__label">Email</label>
              <br></br>
              <input type="text" className="form__input"></input>
              <p id="errorMessage">show your error message here</p>
            </div>
            <div className="form__div">
              <label className="form__label">Password</label>
              <br></br>
              <input type="password" className="form__input"></input>
              <p id="errorMessage">show your error message here</p>
            </div>
            <button className="loginbtn" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="createaccount">
          <span>Don't have an Account ? </span>{" "}
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
