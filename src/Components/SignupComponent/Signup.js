import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { userSchema } from "../Validations/UserSignupValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const inputValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (user.name === "") {
      toast.warn("Name is required");
    }
    if (user.email === "") {
      toast.warn("Email is required");
    }
    if (user.password === "") {
      toast.warn("Password is required");
    }
    if (user.password !== "" && user.password.length < 8) {
      toast.warn("password should be 8 character long");
    }

    const isValid = await userSchema.isValid(user);
    if (isValid) {
      const options = {
        method: "POST",
        url: "http://localhost:3000/signup",
        data: user,
      };

      axios
        .request(options)
        .then((res) => {
          toast.success("Account Created Successfully!",{position:"top-center"
        });
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div>
      <div className="mainform">
        <div className="header">
          <PersonIcon style={{ fontSize: "40px" }} />
          <h1 className="header__heading">Create Account </h1>
        </div>
        <form onSubmit={submitForm}>
          <div className="form">
            <div className="form__div">
              <label className="form__label">Username</label>
              <br></br>
              <input
                type="text"
                className="form__input"
                name="name"
                value={user.name}
                onChange={inputValue}
              ></input>
            </div>
            <div className="form__div">
              <label className="form__label">Email</label>
              <br></br>
              <input
                type="email"
                className="form__input"
                name="email"
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
                value={user.password}
                onChange={inputValue}
              ></input>
            </div>
            <button className="loginbtn" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
