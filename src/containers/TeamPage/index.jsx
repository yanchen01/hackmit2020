import React from "react";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { GitHub } from "@material-ui/icons";

import logo from "../../assets/logo-t.png";

const TeamPage = ({ history, location: { state }, match }) => {
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
      <Container>
        
      </Container>
    </section>
  );
};

export default TeamPage;
