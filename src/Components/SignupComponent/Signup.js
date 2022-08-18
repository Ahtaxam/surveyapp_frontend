import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

import { userSchema } from "../Validations/UserSignupValidation";
import PATH from "../../Constants/Path";
function Signup() {
  const navigate = useNavigate();

  const submit = () => {
    const options = {
      method: "POST",
      url: `${process.env.REACT_APP_BASE_URL}${PATH.SIGNUP}`,
      data: values,
    };

    axios
      .request(options)
      .then((response) => {
        toast.success("Account created!");
        setTimeout(() => {
          navigate(PATH.LOGIN);
        }, 1000);
      })
      .catch((error) => {
        toast.error(error.response.data?.message || error.message);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: submit,
  });
  const handleError = () => {
    toast.error(errors.name);
    toast.error(errors.email);
    toast.error(errors.password);
  };

  return (
    <div>
      <div className="mainform">
        <div className="header">
          <PersonIcon style={{ fontSize: "40px" }} />
          <h1 className="header__heading">Create Account </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="form__div">
              <label className="form__label">Username</label>
              <br></br>
              <input
                type="text"
                className="form__input"
                id="name"
                name="name"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
              />
            </div>

            <div className="form__div">
              <label className="form__label">Email</label>
              <br></br>
              <input
                type="email"
                id="email"
                className="form__input"
                name="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div className="form__div">
              <label className="form__label">Password</label>
              <br></br>
              <input
                type="password"
                className="form__input"
                id="password"
                name="password"
                autoComplete="off"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <button className="loginbtn" onClick={handleError} type="submit">
              Signup
            </button>
          </div>
        </form>
        <button onClick={() => navigate(PATH.LOGIN)} className="loginbtn">
          Login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
