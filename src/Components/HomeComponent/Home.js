import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import graph from "../../../src/Images/graph.jpg";
import logo from "../../../src/Images/logo.jpg";
import "./home.css";
import PATH from "../../Constants/Path";
import { authToken } from "../../utils/Authenticate";

function Home() {
  return (
    <div className="wrapper">
      <section>
        <nav className="navbar">
          <div>
            <p className="navbar__text">Nex Research</p>
          </div>
          {authToken() === null ? (
            <div>
              <Link to={PATH.LOGIN}>
                <button className="navbar__button">Login</button>
              </Link>

              <Link to={PATH.SIGNUP}>
                <button className="navbar__button">Signup</button>
              </Link>
            </div>
          ) : (
            <img
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                position: "relative",
                right: "0px",
                top: "-30px",
              }}
              src={logo}
              alt="logo "
            />
          )}
        </nav>
      </section>

      <div className="main">
        <Typography style={{ textAlign: "center" }} variant="h3">
          Online <span style={{ color: "blue" }}>Survey</span>{" "}
        </Typography>
        <p className="main__paragraph">
          Application used for collecting data from a predefined group of
          respondents to gain information and insights into various topics of
          interest
        </p>
      </div>

      <section className="section">
        <div className="content">
          <h2 className="content__heading">A Web Survey Application</h2>
          <p className="content__para">
            A Simple Web Application that let users to Create Survey According
            to Their needs. Try it for Free
          </p>

          <Link to={PATH.LOGIN} style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              style={{ margin: "10px auto", display: "block" }}
            >
              Login
            </Button>
          </Link>
        </div>
        <div className="ImageDiv">
          <img className="image" src={graph} alt="loading..." />
        </div>
      </section>

      <section className="featureDiv">
        <div>
          <h1
            style={{
              textAlign: "center",
              marginTop: "40px",
              fontFamily: "sans-serif",
            }}
          >
            Features
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "grey",
              margin: "20px",
              lineHeight: "25px",
            }}
          >
            The aim is to make it quick and easy for you to create your Surveys
          </p>
        </div>
        <section className="feature">
          <div className="featureImageDiv">
            <img
              className="featureimage"
              src="https://landing-page-template-nine.vercel.app/img/hero-bg.png"
              alt="Loading..."
            />
          </div>

          <div className="featureContent">
            <h1
              style={{
                textAlign: "center",
                fontFamily: "sans-serif",
                fontSize: "25px",
              }}
            >
              Use in One Click
            </h1>

            <p className="featureContent__para">
              Organize your company's Surveys however you like. Our simple
              Application gives you complete control over how you manage your
              Created Surveys.
            </p>
          </div>
        </section>
      </section>

      <footer className="footer">
        <h3 className="footer__heading">Nax Research</h3>
        <div className="footer__icon">
          <Link to="/">
            <GitHubIcon style={{ textDecoration: "none", color: "white" }} />
          </Link>
          <Link to="/">
            <LinkedInIcon style={{ textDecoration: "none", color: "white" }} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
export default Home;
