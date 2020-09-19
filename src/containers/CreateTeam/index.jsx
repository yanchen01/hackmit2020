import React, { useState } from "react";
import {
  InputGroup,
  Row,
  FormControl,
  Container,
  Button,
  FormGroup,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const CreateTeam = () => {
  const onSubmit = (data) => {};

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <section className="create-event-page m-xl-5">
      <Container>
        <h1>Create Team</h1>

        <div className="mt-lg-3 mb-lg-3">
          <label>Enter team name</label>
          <InputGroup>
            <FormControl
              name="team"
              ref={register({ min: 1, required: true, maxLength: 25 })}
              placeholder="Team1"
              aria-label="team"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.team && (
            <span className="text-danger">
              This field is required (1-25 characters)
            </span>
          )}
        </div>

        {/* conditionally based on current event's max team member size */}
        <div className="mt-lg-3 mt-lg-3">
          <label>Max members</label>
          <InputGroup>
            <FormControl
              name="maxMembers"
              type="number"
              ref={register({ min: 2, max: 50, required: true })}
              placeholder="4"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.maxMembers && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="mt-lg-3 mt-lg-3">
          <label>Current team size</label>
          <InputGroup>
            <FormControl
              name="currentTeamSize"
              type="number"
              ref={register({ min: 2, max: 50, required: true })}
              placeholder="4"
              aria-label="usersPerTeam"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {errors.currentTeamSize && (
            <span className="text-danger">This field is required</span>
          )}
        </div>

        <div className="mt-lg-3 mb-lg-3">
          <Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg">
            Create Team
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default CreateTeam;
