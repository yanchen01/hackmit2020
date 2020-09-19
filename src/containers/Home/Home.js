import React, { useContext } from "react";
import { Container, Button, Row, Navbar, Image, Nav } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { Redirect, useHistory } from "react-router-dom";
import firebase from "firebase";

import { AuthContext } from "../../Auth";

import "react-bootstrap-typeahead/css/Typeahead.css";
import logo from "../../assets/logo-t.png";

import { GitHub } from "@material-ui/icons";

const Home = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  authContext.setCurrentUser(firebase.auth().currentUser);
  console.log(authContext.currentUser);

  return (
    <section className="create-event-page">
      <Navbar bg="light" varient="light">
        <Navbar.Brand href="#home">
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
      <Container className='my-5'>
        <h1>Join or Create an Event</h1>

        <Row className="mt-lg-3 mb-lg-3">
          <Button onClick={() => {}} variant="primary" size="lg">
            Join an Event
          </Button>
        </Row>
        <Row>
          <Button
            onClick={() => {
              history.push("/event");
            }}
            variant="outline-primary"
            size="lg"
          >
            Create an Event
          </Button>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
