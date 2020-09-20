import React, { useState, useEffect, useContext } from "react";
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
import { Chip } from "@material-ui/core";
import { getEventById } from "../../backend/Events/Events";

import { getAllTeamsInEvent } from "../../backend/Events/Teams/Teams";
import logo from "../../assets/logo-t.png";
import { AuthContext } from "../../Auth";

const TeamList = (props) => {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [event, setEvents] = useState([]);
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

    firebase
		.firestore()
		.collection('events')
		.doc(currentEventId)
		.get()
		.then((response) => {
			setEvents(response.data());
		})
		.catch((err) => {
			console.log(err);
    });
    
  }, []);
  console.log("E", event);

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
      
      <Navbar className="d-flex justify-content-between" expand="lg" variant="light" bg="light">
            <FontAwesomeIcon
            onClick={toggleDrawer("left", true)}
            className=""
            icon="bars"
            />
            <Navbar.Brand className="p-2 col-example text-left" onClick={() => setModalShow(true)}>
              <h3><p className="" style={{ marginTop: 13 }}>
            {event.name}
          </p></h3>
        </Navbar.Brand>
          <Nav className="p-2 col-example text-left">
            <Link to={`/event/${currentEventId}/team`}>
              <Button>Add Team</Button>
            </Link>
          </Nav>
        </Navbar>
      <EventModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        eventName={event.name}
        description={event.category}
        link={event.link}
        eventCode={event.eventCode}
        location={event.location}
        eventStart={event.eventStart}
        eventEnd={event.eventEnd}
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
        loader={
          <>
            <p className="text-center lead">Finding More Awesome Teams...</p>
          </>
        }
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
