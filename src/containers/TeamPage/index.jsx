import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Image, Nav, Navbar } from "react-bootstrap";
import { AccountCircle, GitHub } from "@material-ui/icons";
import firebase from "firebase";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { Chip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Hamburger from "../Hamburger/hamburger";

import {
  faDiscord,
  faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

import { AuthContext } from "../../Auth";
import logo from "../../assets/logo-t.png";

// const members = ["google@gmail.com", "test@test.edu"];
// const tags = ["AI", "Community/Connectivity", "Healthcare"];
// const capacity = "4";

const TeamPage = ({ history, location: { state }, match }) => {
  const authContext = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [calendarValue, setCalendarValue] = useState(new Date());
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { team } = state;
  const {
    capacity,
    name,
    members,
    teamTags,
    eventId,
    isFull,
    applications,
  } = team;

  useEffect(() => {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
      authContext.setCurrentUser(currentUser);
      console.log("Profile Current User: ", currentUser);
    } else {
      console.log(currentUser);
    }
  }, []);

  const renderSocial = () => {
    return (
      <>
        <FontAwesomeIcon icon={faDiscord} size="lg" />
        <p className="mx-2">
          <a href="https://www.discord.gg">discord</a>
        </p>

        <FontAwesomeIcon icon={faFacebookMessenger} size="lg" />
        <p className="mx-2">
          <a href="#">messenger</a>
        </p>
      </>
    );
  };

  const onHandleSubmitTime = (hasSubmit) => {
    setSubmitted(true);
    if (hasSubmit) {
      enqueueSnackbar("An error occurred", {
        variant: "info",
        onClick: () => closeSnackbar(),
      });
    } else {
      enqueueSnackbar("Your availability was sent!", {
        variant: "success",
        onClick: () => closeSnackbar(),
      });
    }
  };

  const renderRightAction = () => {
    return (
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Link to={`/event/${eventId}/team`}>
            <Button></Button>
          </Link>
        </Nav>
      </Navbar.Collapse>
    );
  };

  return (
    <section>
      <Hamburger renderRightAction={renderRightAction} />
      <Container className="my-5">
        <div className="row h-100 align-items-center">
          <div className="col">
            <div className="pb-3">
              <h1 className="display-1">{name}</h1>
              {teamTags.map((e, i) => (
                <Chip
                  key={`${e}-${i}`}
                  className="mr-1"
                  label={e}
                  variant="outlined"
                />
              ))}
            </div>
            <div className="row">{renderSocial()}</div>
            <div>
              <h2>{`Members ${members.length}/${capacity}`}</h2>
              {members.map((e, i) => (
                <List key={`${e}-${i}`} dense>
                  <ListItem>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary={e} />
                  </ListItem>
                </List>
              ))}
            </div>
          </div>

          <div className="col px-5" style={{}}>
            <h1>Actions</h1>
            <p className="lead">Indicate your availability</p>
            <div>
              <Calendar
                selectRange
                onChange={setCalendarValue}
                value={calendarValue}
              />
            </div>
            <Button
              onClick={() => onHandleSubmitTime(submitted)}
              variant="primary"
              disabled={submitted}
              className="mt-3"
            >
              Submit Time
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TeamPage;
