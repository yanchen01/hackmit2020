import React, { useState } from 'react';
import { Navbar, Container, Row, Col, ListGroup, Button, Image } from 'react-bootstrap';
import faker from 'faker';
import './index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Drawer/HAMBURGER menu
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';




const Profile = () => {

    // Hamburger
  const [anchor, setAnchor] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setAnchor(open);
  };

  const classes = makeStyles({
    list: {
      width: 550,
    },
    fullList: {
      width: 'auto',
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
            <h2 className="text-center">Lobby</h2>
          </Col>
        </Row>
        <Row>
          <Col>
          <hr/>
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
            <hr/>
            <p><a href="/settings"> Settings</a></p>
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
                <FontAwesomeIcon onClick={toggleDrawer("left", true)} className="" icon="hamburger" />
                <Navbar.Brand className="mx-auto">Lobby</Navbar.Brand>
        </Navbar>
    <Container className="w-100 h-100">
      
        <React.Fragment key="left">
            <Drawer anchor="left" open={anchor} onClose={toggleDrawer("left", false)}>
            {list(anchor)}
            </Drawer>
        </React.Fragment>

        <div className="center">
            <Row className="justify-content-md-center mt-3 post">
                <Image src={faker.image.avatar()} roundedCircle />
            </Row>
            <Row className="justify-content-md-center mt-3 post">
                <h1>{faker.name.firstName()}</h1>
            </Row>
            
            <Row className="justify-content-md-center mt-3 post">
                <p>{faker.lorem.words(40)}</p>
            </Row>
            <Row className="mt-3 post">
                <Button>Edit Description</Button>
            </Row>
        </div>
    </Container>
    </div>
    

  );
}

export default Profile;