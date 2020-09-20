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
  Spinner,
} from "react-bootstrap";
import faker from "faker";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import List from "@material-ui/core/List";
import { Redirect } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import { ArrowRight, ChevronRight, Event } from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";

import Hamburger from "../Hamburger/hamburger";
import { AuthContext } from "../../Auth";
import logo from "../../assets/logo-t.png";
import { getEventsCreated, getEventsJoined } from "../../backend/User/User";

// Drawer/HAMBURGER menu

const Profile = ({ history, location }) => {
  const authContext = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
      setLoading(true);
      authContext.setCurrentUser(currentUser);
      const uid = currentUser.uid;

      const db = firebase.firestore();

      db.collection("users")
        .where("id", "==", uid)
        .get()
        .then((querySnapshot) => {
          const userDoc = [];
          const eventsList = [];
          querySnapshot.forEach((res) => {
            userDoc.push(res.data());
          });
          const eventRef = db.collection("events");

          userDoc[0].eventsCreated.forEach((eventID) => {
            eventRef
              .doc(eventID)
              .get()
              .then((res) => {
                eventsList.push({ ...res.data(), owner: true });
                setEvents(eventsList);
                setLoading(false);
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  const handleEditDescription = () => {
    setIsEditingDescription((v) => !v);
  };

  const renderTeamRows = () => {
    return (
      <div className="mt-5">
        <h4>Events</h4>
        <List component="nav" aria-labelledby="nested-list-subheader">
          {!loading && events ? (
            events.map((el, idx) => {
              const {
                category,
                date,
                eventCode,
                link,
                location,
                members,
                name,
                teams,
              } = el;
              return (
                <ListItem onClick={() => {

                }} key={`${el}-${idx}`} button>
                  <ListItemIcon>
                    <Event />
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    secondary={el.owner ? "Event Owner" : undefined}
                  />
                  <ListItemIcon>
                    <ChevronRight />
                  </ListItemIcon>
                </ListItem>
              );
            })
          ) : (
            <div className="justify-content-center">
              <Spinner animation="border" />
            </div>
          )}
        </List>
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
