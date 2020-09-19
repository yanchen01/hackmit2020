import React from 'react';
import firebase from 'firebase';

const Join = () => {
  const onSubmit = () => {

  }

  return (
    <div>
      <h1>Join Event</h1>
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
    </div>
  );
}

export default Join;
