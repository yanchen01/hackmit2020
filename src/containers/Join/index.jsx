import React from "react";
import {
  InputGroup,
  Row,
  FormControl,
  Container,
  Button,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import firebase from "firebase";
import "./style.css";

const Join = () => {
  const onSubmit = (data) => {
    const { eventCode, name } = data;
  };

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <section className="join-event-page m-xl-5">

      <Container>
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
