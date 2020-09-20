import React from "react";
import {
  InputGroup,
  Row,
  FormControl,
  Container,
  Button,
  Navbar,
  Image,
  Nav,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import firebase from "firebase";

import "./style.css";
import { GitHub } from "@material-ui/icons";

import logo from "../../assets/logo-t.png";
import { addEventMember } from "../../backend/Events/Events";

const Join = () => {
  const onSubmit = (data) => {
    const { eventCode, name } = data;
    const res = addEventMember(eventCode, firebase.auth().currentUser.uid);
  };

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <section className="join-event-page">
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
        <h1>Join Event</h1>

        <div className="mt-lg-3 mb-lg-3">
          <label>Enter event code</label>
          <InputGroup>
            <FormControl
              name="eventCode"
              ref={register({ min: 1, required: true, maxLength: 25 })}
              placeholder="hackmit2020"
              aria-label="eventcode"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        {errors.eventCode && (
          <span className="text-danger">This field is required</span>
        )}

        <div className="mt-lg-3 mt-lg-3">
          <label>What would you like your teammates to call you?</label>
          <InputGroup>
            <FormControl
              name="name"
              ref={register({ min: 3, max: 50, required: true })}
              placeholder="Alex"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>
        {errors.name && (
          <span className="text-danger">This field is required</span>
        )}

        <div className="mt-lg-3 mb-lg-3">
          <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg">
            Join
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Join;
