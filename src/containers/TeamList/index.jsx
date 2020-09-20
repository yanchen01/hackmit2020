import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Modal,
  Nav,
  Image,
  Spinner,
} from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import faker from "faker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import { Link } from "react-router-dom";

import "./index.css";

// Drawer/HAMBURGER menu
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { GitHub } from "@material-ui/icons";
import { Chip } from "@material-ui/core";

import { getAllTeamsInEvent } from "../../backend/Events/Teams/Teams";
import logo from "../../assets/logo-t.png";

const TeamList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const {
    location: { state },
  } = props.history;
  const currentEventId = props.match.params.id;

  useEffect(() => {
    const teamsList = [];
    setIsLoading(true);
    firebase
      .firestore()
      .collection("teams")
      .where("eventId", "==", currentEventId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          teamsList.push(element.data());
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
    setTeams(teamsList);
  }, []);

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
                <a href="/profile">Profile</a>
              </p>
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

  const renderLoadingView = () => {
    return <Spinner animation="border" />;
  };

  return (
    <div>
      <Navbar className="" expand="lg" variant="light" bg="light">
        <FontAwesomeIcon
          onClick={toggleDrawer("left", true)}
          className=""
          icon="hamburger"
        />
        <Navbar.Brand href="/">
          <Image src={logo} className="logo" />
          Lobby
        </Navbar.Brand>
        <Navbar.Brand className="nav-m" onClick={() => setModalShow(true)}>
          HackMIT2020
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link to={`/event/${currentEventId}/team`}>
              <Button>Add Team</Button>
            </Link>
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
          {!isLoading && teams && teams.length > 0 ? (
            teams.map((item, index) => {
              console.log("item", item);
              const {
                capacity,
                name,
                members,
                teamTags,
                eventId,
                isFull,
                applications,
              } = item;
              return (
                <ListGroup.Item key={index} className="mt-3 post">
                  <Row className="align-items-center">
                    <Col sm={10}>
                      <h3>{`${name}`}</h3>
                      {teamTags.map((el, idx) => (
                        <Chip className="mr-1" variant="outlined" label={el} />
                      ))}
                    </Col>
                    <Col sm={2}>
                      <h4>{`${members.length}/${capacity}`}</h4>
                      <Button
                        size="lg"
                        variant="outline-primary"
                        onClick={() =>
                          props.history.push({
                            pathname: `/team`,
                            state: {
                              team: item,
                            },
                          })
                        }
                      >
                        Join <FontAwesomeIcon icon="arrow-right" />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })
          ) : (
            <div className="justify-content-center m-auto">
              {renderLoadingView()}
            </div>
          )}
        </ListGroup>
      </InfiniteScroll>
    </div>
  );
};

export default TeamList;
