import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
function Signup() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const inputValue = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    const nameerror = document.getElementById("nameerror");
    const emailerror = document.getElementById("emailerror");
    const passworderror = document.getElementById("passworderror");
    e.preventDefault();
    if (user.name === "") {
      nameerror.classList.remove("valid");
      nameerror.classList.add("invalid");
    }
    if (user.email === "") {
      emailerror.classList.remove("valid");
      emailerror.classList.add("invalid");
    }
    if (user.password === "") {
      passworderror.classList.remove("valid");
      passworderror.classList.add("invalid");
    }
    console.log(user);
  };
  const removeNameErrorMessage = () => {
    document.getElementById("nameerror").classList.add("valid");
  };
  const removeEmailErrorMessage = () => {
    document.getElementById("emailerror").classList.add("valid");
  };
  const removePasswordErrorMessage = () => {
    document.getElementById("passworderror").classList.add("valid");
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
                onKeyUp={removeNameErrorMessage}
              ></input>
              <p className="errorMessage" id="nameerror">
                name is required
              </p>
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
                onKeyUp={removeEmailErrorMessage}
              ></input>
              <p className="errorMessage" id="emailerror">
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
              <p className="errorMessage" id="passworderror">
                Password is required
              </p>
            </div>
            <button className="loginbtn" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
