import React, { useContext, useEffect } from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { AccountCircle, GitHub } from "@material-ui/icons";
import firebase from "firebase";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { Chip } from "@material-ui/core";

import logo from "../../assets/logo-t.png";
import { AuthContext } from "../../Auth";

const members = ["google@gmail.com", "test@test.edu"];
const tags = ["AI", "Community/Connectivity", "Healthcare"];
const capacity = "4";

const TeamPage = ({ history, location: { state }, match }) => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    let currentUser = firebase.auth().currentUser;

    if (currentUser) {
      authContext.setCurrentUser(currentUser);
      console.log("Profile Current User: ", currentUser);
    } else {
      console.log(currentUser);
    }
  }, []);

  return (
    <section>
      <Navbar bg="light" varient="light">
        <Navbar.Brand href="/">
          <Image src={logo} className="logo" />
          Lobby
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="https://github.com/yanchen01/hackmit2020">
              <GitHub />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="my-5">
        <div className="row h-100 align-items-center">
          <div className="col">
            <div className="pb-3">
              <h1 className="display-1">Team 1</h1>
              {tags.map((e, i) => (
                <Chip key={`${e}-${i}`} className='mr-1' label={e} variant="outlined" />
              ))}
            </div>
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

          <div className="col" style={{}}></div>
        </div>
      </Container>
    </section>
  );
};

export default TeamPage;
