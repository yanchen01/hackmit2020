import React, { useContext, useEffect, useState, Link } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import faker from "faker";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import List from "@material-ui/core/List";
import { Redirect } from "react-router-dom";
import Hamburger from '../Hamburger/hamburger'

import { AuthContext } from "../../Auth";
import logo from "../../assets/logo-t.png";
import { getEventsCreated, getEventsJoined } from "../../backend/User/User";

// Drawer/HAMBURGER menu

const Profile = () => {
  const authContext = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [description, setDescription] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
      authContext.setCurrentUser(currentUser);
      const eventsCreated = getEventsCreated(authContext.currentUser.uid);
      const eventsJoined = getEventsJoined(authContext.currentUser.uid);

      if (eventsCreated) {
        const currentEvents = [...events, ...eventsCreated];
        setEvents(currentEvents);
      }

      if (eventsJoined) {
        const currentEvents = [...events, ...eventsJoined];
        setEvents(currentEvents);
      }
    }
  }, []);

  const handleEditDescription = () => {
    setIsEditingDescription((v) => !v);
  };

  const renderTeamRows = () => {
    return (
      <div className="mt-5">
        <h4>Events</h4>
        <List component="nav" aria-labelledby="nested-list-subheader"></List>
      </div>
    );
  };

  return (
    <div>
      <Hamburger />
      <Container className="w-100 h-100">

        <div className="center">
          <Row className="justify-content-md-center mt-3 post">
            <Image
              id="profile-pic"
              src={
                authContext.currentUser
                  ? authContext.currentUser.photoURL
                  : "default-profile-picture.jpg"
              }
              roundedCircle
            />
          </Row>
          <Row className="justify-content-md-center mt-3 post">
            <h1>
              {authContext?.currentUser?.displayName ?? <Redirect to="/home" />}
            </h1>
          </Row>

          {isEditingDescription ? (
            <>
              <Row className="justify-content-md-center mt-3 post">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>New description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
                    aria-label="Something strange"
                  />
                </InputGroup>
              </Row>

              <Row className="mt-3">
                <Button
                  onClick={() => {
                    setDescription(description);
                    setIsEditingDescription(false);
                  }}
                >
                  Submit new description
                </Button>
              </Row>
            </>
          ) : (
            <>
              <Row className="justify-content-md-center mt-3 post">
                <p>{description}</p>
              </Row>
              <Row className="mt-3 justify-content-md-center post">
                <Button onClick={() => handleEditDescription()}>
                  {description.length > 0
                    ? `Edit Description`
                    : `Add Description`}
                </Button>
              </Row>
            </>
          )}
          {renderTeamRows()}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
