import React, { useState } from "react";
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

const CreateEvent = () => {
  const [isMaxMembersPerTeamEnabled, setIsMaxMembersPerTeamEnabled] = useState(
    false
  );
  const [maxMembersPerTeam, setMaxMembersPerTeam] = useState(0);
  const onSubmit = (data) => {
    const { eventCode, name } = data;
  };

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <section className="create-event-page m-xl-5">
      <Container>
        <h1>Create Event</h1>

        <div className="mt-lg-3 mb-lg-3">
          <label>Enter event name</label>
          <InputGroup>
            <FormControl
              name="eventCode"
              ref={register({ min: 1, required: true, maxLength: 25 })}
              placeholder="hackmit2020"
              aria-label="eventcode"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.eventCode && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="mt-lg-3 mt-lg-3">
          <label>Enter a memorable event code</label>
          <InputGroup>
            <FormControl
              name="name"
              ref={register({ min: 3, max: 50, required: true })}
              placeholder="Alex"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.name && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="mt-lg-3 mt-lg-3">
          <label>Max teams?</label>
          <InputGroup>
            <FormControl
              name="maxTeams"
              ref={register({ min: 3, max: 50, required: true })}
              placeholder="100"
              aria-label="teams"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.maxTeams && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="mt-lg-3 mt-lg-3">
          <label>Max members per team?</label>
          <InputGroup>
            <FormControl
              name="maxUsersPerTeam"
              ref={register({ min: 3, max: 50, required: true })}
              placeholder="4"
              aria-label="usersPerTeam"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.maxUsersPerTeam && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="form-group mt-lg-3 mb-lg-3">
          <label htmlFor="exampleFormControlSelect2">
            Example multiple select
          </label>
          <select
            onChange={(e) => console.log("data", e.target.value)}
            multiple
            className="form-control"
            id="exampleFormControlSelect2"
          >
            <option>Let members choose up to max</option>
            <option>Custom number</option>
          </select>
          {isMaxMembersPerTeamEnabled && (
            <div className="mt-lg-3 mt-lg-3">
              <label>Set max members per team</label>
              <InputGroup>
                <FormControl
                  name="maxUsersPerTeam"
                  ref={register({ min: 3, max: 50, required: true })}
                  placeholder="Let members choose up to max"
                  aria-label="usersPerTeam"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {errors.maxUsersPerTeam && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-lg-3 mb-lg-3">
          <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg">
            Create
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CreateEvent;
