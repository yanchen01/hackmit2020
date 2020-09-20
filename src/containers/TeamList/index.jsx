import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Navbar,
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
  Nav,
} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import faker from "faker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./index.css";

// Drawer/HAMBURGER menu
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { GitHub } from "@material-ui/icons";

import { getAllTeamsInEvent } from "../../backend/Events/Teams/Teams";

const TeamList = ({ location, history, match }) => {
  const {
    location: { state },
  } = history;
  const currentEventId = state.eventId;

  // Hamburger
  function EventModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>
            <h3>Welcome to {props.eventName}!</h3>
          </p>
          <p>{props.description}</p>
          <h3> Connect With Us: </h3>
          <ul>
            <li>
              <a href={props.link}>{props.link}</a>
            </li>
            <li>Event Code: {props.eventCode}</li>
            <li>Location: {props.location}</li>
            <li>Category: {props.category}</li>
          </ul>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Body>
      </Modal>
    );
  }

  const [anchor, setAnchor] = useState(false);

  useEffect(() => {
    const teams = getAllTeamsInEvent(currentEventId);
    console.log("Result: ", teams);
  }, []);

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
              <h2 className="text-center">Lobby</h2>
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
                <a href="/settings">
                  <FontAwesomeIcon icon="cog" /> Settings
                </a>
              </p>
              <p>
                <FontAwesomeIcon icon="sign-out-alt" /> Sign Out
              </p>
            </Col>
          </Row>
        </Container>
      </List>
    </div>
  );

  const [modalShow, setModalShow] = React.useState(false);

  const data = new Array(1000).fill().map((value, id) => ({
    id: id,
    title: faker.name.firstName(),
    body: faker.lorem.sentences(8),
  }));

  const [count, setCount] = useState({
    prev: 0,
    next: 10,
  });

  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(data.slice(count.prev, count.next));
  const getMoreData = () => {
    if (current.length === data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(current.concat(data.slice(count.prev + 10, count.next + 10)));
    }, 2000);
    setCount((prevState) => ({
      prev: prevState.prev + 10,
      next: prevState.next + 10,
    }));
  };

  return (
    <div>
      <Navbar className="" expand="lg" variant="light" bg="light">
        <FontAwesomeIcon
          onClick={toggleDrawer("left", true)}
          className=""
          icon="hamburger"
        />
        <Navbar.Brand className="mx-auto" onClick={() => setModalShow(true)}>
          HackMIT2020
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href={`/event/${currentEventId}`}>
              <Button>Add Team</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <EventModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        eventName="HackMIT 2020"
        description={faker.lorem.words(20)}
        link="https://hackmit.org/"
        eventCode="HackWithUs"
        location="The World Wide Web"
        category="GeekSquad"
        eventStart="9/18"
        eventEnd="9/21"
      />
      <br />
      <h3 className="text-center">Find your Team:</h3>

      <React.Fragment key="left">
        <Drawer
          anchor="left"
          open={anchor}
          onClose={toggleDrawer("left", false)}
        >
          {list(anchor)}
        </Drawer>
      </React.Fragment>

      <InfiniteScroll
        dataLength={current.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<h2 className="text-center">Finding More Awesome Teams...</h2>}
      >
        <ListGroup variant="flush">
          {current &&
            current.map((item, index) => (
              <ListGroup.Item key={index} className="mt-3 post">
                <Row className="align-items-center">
                  <Col sm={10}>
                    <h3>{`${item.title}`}</h3>
                    <p>{item.body}</p>
                  </Col>
                  <Col sm={2}>
                    <h4>3/4</h4>
                    <Button size="lg" variant="outline-primary">
                      Join <FontAwesomeIcon icon="arrow-right" />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </InfiniteScroll>
    </div>
  );
};

export default TeamList;
