import React from "react";
import PersonIcon from "@mui/icons-material/Person";
function Signup() {
  return (
    <div>
      <div className="mainform">
        <div className="header">
          <PersonIcon style={{ fontSize: "40px" }} />
          <h1 className="header__heading">Create Account </h1>
        </div>
        <form>
          <div className="form">
            <div className="form__div">
              <label className="form__label">Username</label>
              <br></br>
              <input type="text" className="form__input" name="name"></input>
              <p id="errorMessage">show your error message here</p>
            </div>
            <div className="form__div">
              <label className="form__label">Email</label>
              <br></br>
              <input type="email" className="form__input" name="email"></input>
              <p id="errorMessage">show your error message here</p>
            </div>
            <div className="form__div">
              <label className="form__label">Password</label>
              <br></br>
              <input
                type="password"
                className="form__input"
                name="password"
              ></input>
              <p id="errorMessage">show your error message here</p>
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
