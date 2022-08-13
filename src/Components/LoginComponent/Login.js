import React, { useState } from "react";
import login from "./login.css";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { userSchema } from "../Validations/UserLoginValidation";
function Login() {
  const [user, setData] = useState({ email: "", password: "" });
  const inputValue = (e) => {
    setData({ ...user, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    const emailerror = document.getElementById("emailerror");
    const passworderror = document.getElementById("passworderror");
    e.preventDefault();
    if (user.email === "") {
      emailerror.style.opacity = 1;
    }
    if (user.password === "") {
      passworderror.style.opacity = 1;
    }

    const isValid = await userSchema.isValid(user);
    console.log(isValid);
  };
  const removeEmailErrorMessage = () => {
    document.getElementById("emailerror").style.opacity = 0;
  };
  const removePasswordErrorMessage = () => {
    document.getElementById("passworderror").style.opacity = 0;
  };
  return (
    <div>
      <div className="mainform">
        <div className="header">
          <LockIcon className="header__icon"></LockIcon>
          <h1 className="header__heading">Login </h1>
        </div>
        <form onSubmit={submitForm}>
          <div className="form">
            <div className="form__div">
              <label className="form__label">Email</label>
              <br></br>
              <input
                type="email"
                className="form__input"
                name="email"
                value={user.email}
                onChange={inputValue}
                onKeyUp={removeEmailErrorMessage}
              ></input>
              <p className="loginerrorMessage" id="emailerror">
                Email is required
              </p>
            </div>
            <div className="form__div">
              <label className="form__label">Password</label>
              <br></br>
              <input
                type="password"
                className="form__input"
                name="password"
                value={user.password}
                onChange={inputValue}
                onKeyUp={removePasswordErrorMessage}
              ></input>
              <p className="loginerrorMessage" id="passworderror">
                Password is required
              </p>
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
