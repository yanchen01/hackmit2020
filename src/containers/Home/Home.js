import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Row, Navbar, Image, Nav } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

import "react-bootstrap-typeahead/css/Typeahead.css";

import { GitHub, Menu } from "@material-ui/icons";

import logo from "../../assets/logo-t.png";
import { AuthContext } from "../../Auth";

const Home = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log("Home from Auth: ", authContext.currentUser);
    let currentUser = authContext.currentUser;
    if (currentUser) {
      const { displayName, email, emailVerified } = currentUser;
      setUser(displayName);
    }
  }, []);

  const onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        console.log("signed out", res);
        authContext.setCurrentUser(null);
      })
      .catch((err) => {
        console.log("error signing out", err);
      });
  };

  // Hamburger
  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAnchor(open);
  };

  const classes = makeStyles({
    list: {
      width: 550,
    },
    fullList: {
      width: "auto",
    },
  });

  const list = (anchor) => (
    <div
      className="dr"
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Container fluid>
          <Row>
            <Col>
              <Navbar.Brand id="logo" href="/" className="mx-auto">
                <Image src={logo} className="logo" />
                Lobby
              </Navbar.Brand>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
              <h3>Current Events:</h3>
              <ul>
                <li>Standford Hacks 2020</li>
                <li>Cake Cooking Competition</li>
                <li>FizzBuzz Showdown</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
              <p>
                <a href="/settings"> Settings</a>
              </p>
              <p>Sign Out</p>
            </Col>
          </Row>
        </Container>
      </List>
    </div>
  );

  // ^^^^^^^^^^^^^

  return (
    <section className="create-event-page">
      <Navbar className="" expand="lg" variant="light" bg="light">
        <FontAwesomeIcon
          onClick={toggleDrawer("left", true)}
          className=""
          icon="bars"
        />
        <Navbar.Brand href="/" className="mx-auto">
          <Image src={logo} className="logo" />
          Lobby
        </Navbar.Brand>
      </Navbar>

      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={anchor}
          onClose={toggleDrawer("left", false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      <Container className="my-5">
        <h1>
          {user && `Welcome ${user}, `}
          Join or Create an Event
        </h1>

        <Row className="mt-5">
          <Button
            onClick={() => {
              history.push("/profile");
            }}
            variant="danger"
            size="lg"
          >
            Profile
          </Button>
        </Row>

        <Row className="my-lg-3">
          <Button
            onClick={() => {
              history.push("/join");
            }}
            variant="primary"
            size="lg"
          >
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
        <Row className="mt-5">
          <Button onClick={onLogout} variant="danger" size="lg">
            Sign out
          </Button>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
