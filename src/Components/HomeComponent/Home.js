import React from "react";
import home from "./home.css";
import survey from "../../../src/Images/survey.jpg";
import graph from "../../../src/Images/graph.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="wrapper">
      <section>
        <nav className="navbar">
          <div>
            <p className="navbar__text">Nex Research</p>
          </div>
          <div>
            <Link to="/login">
              <button className="navbar__button">Login</button>
            </Link>

            <Link to="/signup">
              <button className="navbar__button">Signup</button>
            </Link>
          </div>
        </nav>
      </section>

      <div className="main">
        <h2 className="main__heading">
          Online <span style={{ color: "blue" }}>Survey</span>{" "}
        </h2>
        <p className="main__paragraph">
          Application used for collecting data from a predefined group of
          respondents to gain information and insights into various topics of
          interest
        </p>
      </div>

      <div className="imagediv">
        <img className="imagediv__image" src={survey} alt="loading..." />
      </div>

      <h2 className="heading">
        Collect your survey with us to excel your business
      </h2>
      <div className="imagediv">
        <img className="imagediv__image" src={graph} alt="loading..." />
      </div>
    </div>
  );
}
export default Home;
