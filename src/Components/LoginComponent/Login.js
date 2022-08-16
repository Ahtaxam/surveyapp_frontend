import React, { useState } from "react";
import login from "./login.css";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { userSchema } from "../Validations/UserLoginValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  axios.defaults.withCredentials = true;
  const [user, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const inputValue = (e) => {
    setData({ ...user, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    e.preventDefault();
    if (user.email === "") {
      toast.warn("Email is required !");
    }
    if (user.password === "") {
      toast.warn("Password is required !");
    }

    const isValid = await userSchema.isValid(user);
    if (isValid) {
      const options = {
        method: "POST",
        url: "http://localhost:3000/login",
        data: user,
      };

      axios
        .request(options)
        .then((response) => {
          navigate("/dashboard", { replace: true });
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data);
        });
    }
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
                autoComplete="off"
                value={user.email}
                onChange={inputValue}
              ></input>
            </div>
            <div className="form__div">
              <label className="form__label">Password</label>
              <br></br>
              <input
                type="password"
                className="form__input"
                name="password"
                autoComplete="off"
                value={user.password}
                onChange={inputValue}
              ></input>
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
      <ToastContainer />
    </div>
  );
}

export default Login;
