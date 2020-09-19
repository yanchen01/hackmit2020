import React from 'react';
import { InputGroup, FormControl } from "react-bootstrap";
import firebase from 'firebase';

const Join = () => {
  const onSubmit = () => {
  }

  return (
    <section className='join-event-page'>
      <h1>Join Event</h1>
      <InputGroup>
        <FormControl
          placeholder="Username"
          aria-label="hackmit2020"
          aria-describedby="basic-addon1"
        />
      </InputGroup>

      <form onSubmit={onSubmit}>
        <label>
          Enter event code
          <input name="code" type="code" placeholder="hackmit2020" />
        </label>
        <label>
          What would you like your teammates to call you?
          <input name="name" type="name" placeholder="Alex" />
        </label>
      </form>
    </section>
  );
}

export default Join;
