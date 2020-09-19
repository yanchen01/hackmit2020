import React from 'react';
import { InputGroup, Row, FormControl, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import firebase from 'firebase';
import './style.css';

const Join = () => {
  const onSubmit = () => {

  }

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <section className='join-event-page m-xl-5'>
      <Container>
        <h1>Join Event</h1>

        <div className='mt-lg-3 mb-lg-3'>
          <label>Enter event code</label>
          <InputGroup>
            <FormControl
              placeholder="hackmit2020"
              aria-label="eventcode"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>

        <div className='mt-lg-3 mt-lg-3'>
          <label>
            What would you like your teammates to call you?
          </label>
          <InputGroup>
            <FormControl
              placeholder="Alex"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
        </div>

        <div className='mt-lg-3 mb-lg-3'>
          <Button variant='primary' size='lg'>
            Join
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default Join;
