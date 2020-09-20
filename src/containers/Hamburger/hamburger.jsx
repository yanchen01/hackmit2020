import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Row, Navbar, Image, Nav, Col, ListGroup } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { GitHub } from '@material-ui/icons';

import logo from '../../assets/logo-t.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hamburger = () => {

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
        <Navbar.Collapse className="justify-content-end">
			<Nav>
                <Nav.Link href="https://github.com/yanchen01/hackmit2020">
                <GitHub />
                </Nav.Link>
		    </Nav>
		</Navbar.Collapse>
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