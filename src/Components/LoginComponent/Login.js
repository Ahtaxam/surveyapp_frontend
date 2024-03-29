import React from "react";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

import { userSchema } from "../Validations/UserLoginValidation";
import "./login.css";
import PATH from "../../Constants/Path";

function Login() {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const submit = () => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.LOGIN}`,
      data: values,
    };
    axios
      .request(options)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message, {
          icon: "🚀",
        });
        localStorage.setItem(
          "loggedUser",
          JSON.stringify({
            name: response.data.name,
            email: response.data.email,
          })
        );

        navigate(PATH.DASHBOARD);
      })
      .catch((error) => {
        toast.error(error.response?.data || error.message);
      });
  };
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: submit,
  });

  /**
   * @return {String}
   */
  const handleError = () => {
    toast.error(errors.email);
    toast.error(errors.password);
  };

  return (
    <div>
      <div className="mainform">
        <div className="header">
          <LockIcon className="header__icon"></LockIcon>
          <h1 className="header__heading">Login </h1>
        </div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="form">
            <div className="form__div">
              <label className="form__label">Email</label>
              <br></br>
              <input
                type="email"
                className="form__input"
                name="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
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
                value={values.password}
                onChange={handleChange}
              ></input>
            </div>
            <button onClick={handleError} className="loginbtn" type="submit">
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
