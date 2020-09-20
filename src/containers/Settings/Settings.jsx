import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Button, Row, Navbar, Image, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import logo from '../../assets/logo-t.png';

const Settings = () => {

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
      <h1>App is perfect as is. No personal settings needed</h1>
    </div>
  );
}

export default Settings;