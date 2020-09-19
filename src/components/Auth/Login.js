import React, { useContext, useEffect } from "react";
import { withRouter, Redirect } from "react-router";
import firebase from "firebase";
// import axios from 'axios';

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { AuthContext } from "../../Auth";

/* Event Handler*/
import { addUser } from "../../backend/User/User";
import { Container } from "react-bootstrap";

const Login = ({ history }) => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        addUser(user.uid, user.email, user.displayName);
        setCurrentUser(user);
      }
    });
  }, []);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <section className="bg-dark cover-full">
      <h1 className="text-light">Login</h1>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </section>
  );
};

export default withRouter(Login);
