import React, { useContext, useEffect } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { GitHub } from "@material-ui/icons";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

import logo from "../../assets/logo-t.png";
import Bg from "../../components/Bg";
import AnimatedCard from "../../components/AnimatedCard";
import card from "../../assets/card.png";
import { AuthContext } from "../../Auth";

const TeamPage = ({ history, location: { state }, match }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
      authContext.setCurrentUser(currentUser);
      console.log("Profile Current User: ", currentUser);
    } else {
      console.log(currentUser);
    }
  }, []);

  return (
    <section>
      <Navbar bg="light" varient="light">
        <Navbar.Brand href="/">
          <Image src={logo} className="logo" />
          Lobby
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
      <Container className="my-5">
        <div className="row h-100 align-items-center">
          <div className="col">
            <div className="pb-3">
              <h1>Team 1</h1>
            </div>
            <div></div>
          </div>

          <div className="col" style={{}}></div>
        </div>
      </Container>
    </section>
  );
};

export default TeamPage;
