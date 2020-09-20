import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Row, Navbar, Image, Nav, Col, ListGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { Redirect, Link } from 'react-router-dom';
import firebase from "firebase";

// Dynamic Events
import { getEventsCreated, getEventsJoined } from "../../backend/User/User";
import { AuthContext } from "../../Auth";

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { GitHub } from '@material-ui/icons';

import logo from '../../assets/logo-t.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hamburger = () => {
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const [events, setEvents] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    const onLogout = () => {
		firebase
			.auth()
			.signOut()
			.then((res) => {
				console.log('signed out', res);
				authContext.setCurrentUser(null);
			})
			.catch((err) => {
				console.log('error signing out', err);
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
           {/*<Row>
            <Col>
              <hr />
              <h3>Current Events:</h3>
              <ul>
                <li>Standford Hacks 2020</li>
                <li>Cake Cooking Competition</li>
                <li>FizzBuzz Showdown</li>
              </ul>
            </Col>
          </Row>*/}
          <Row>
            <Col>
              <hr />
              <p><Link to="/profile">Profile</Link></p>
              <p><Link to="/settings">Settings</Link></p>
              <p><Link to="" onClick={onLogout}>Sign out</Link></p>
            </Col>
          </Row>
        </Container>
      </List>
    </div>
  );

  // ^^^^^^^^^^^^^

    return(
        <div>
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
            <Nav.Link href="https://github.com/yanchen01/hackmit2020">
							<GitHub />
						</Nav.Link>
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
        </div>
    );
}

export default Hamburger;