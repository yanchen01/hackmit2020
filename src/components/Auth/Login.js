import React, { useContext, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Image, Nav, Navbar } from "react-bootstrap";
import { GitHub } from "@material-ui/icons";
import { renderToStaticMarkup } from "react-dom/server";

import { AuthContext } from "../../Auth";
import "./loginStyles.css";
import logo from "../../assets/logo-t.png";
import card from "../../assets/card.png";
import AnimatedCard from "../AnimatedCard";
import Bg from "../Bg";
/* Event Handler*/
import { addUser } from "../../backend/User/User";

const Login = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        addUser(user.uid, user.email, user.displayName);
        setCurrentUser(user);
      }
    });
  }, []);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  const svgString = encodeURIComponent(renderToStaticMarkup(<Bg />));

  return (
    <section>
      <Navbar bg="light" varient="light">
        <Navbar.Brand href="#home">
          <Image src={logo} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="https://github.com/yanchen01/hackmit2020">
              <GitHub />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container" style={{ height: "80vh" }}>
        <div className="row h-100 align-items-center">
          <div className="col">
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: -250,
                width: "220%",
                height: "220%",
                zIndex: -1,
              }}
            >
              <Bg />
            </div>
            <div className="pb-3">
              <h1>Lobby</h1>
              <h2>Find teammates really fast.</h2>
              <p className="lead" style={{ color: "#E5588B" }}>
                A HackMIT 2020 Project
              </p>
            </div>
            <div>
              <StyledFirebaseAuth
                className="firebaseUi"
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </div>

          <div className="col" style={{}}>
            <AnimatedCard weight={0.5} clickable={false}>
              <Image src={card} className="card shadow-lg" />
            </AnimatedCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Login);
