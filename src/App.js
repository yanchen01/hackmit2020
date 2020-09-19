import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "firebase";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { ThemeProvider } from "styled-components";
import {
  faTimes,
  faArrowRight,
  faPlusCircle,
  faHamburger,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

import { GlobalStyles, darkTheme } from "./styles";

/* Import containers */

import Home from "./containers/Home/Home";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import Event from "./containers/Event/Event.jsx";
import Profile from "./containers/Profile/Profile.jsx";
import Settings from "./containers/Settings/Settings.jsx";

/* Import Auth */
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import CreateEvent from "./containers/CreateEvent";
import CreateTeam from "./containers/CreateTeam";
import Join from "./containers/Join";
import TeamList from "./containers/TeamList";

const firebaseConfig = {
  apiKey: "AIzaSyD-w8z8ollWZttoETyFL7Zkk-FVnhZoKdw",
  authDomain: "hackmit2020-a3fb0.firebaseapp.com",
  databaseURL: "https://hackmit2020-a3fb0.firebaseio.com",
  projectId: "hackmit2020-a3fb0",
  storageBucket: "hackmit2020-a3fb0.appspot.com",
  messagingSenderId: "295002459820",
  appId: "1:295002459820:web:4f63a761bb6e0d1339d909",
};

firebase.initializeApp(firebaseConfig);
library.add(fab, faTimes, faArrowRight, faPlusCircle, faHamburger, faCog);

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <>
          {/*<GlobalStyles />*/}
          <Router>
            <div>
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/home" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/event" component={Event} />
              <Route exact path="/createevent" component={CreateEvent} />
              <Route exact path="/createteam" component={CreateTeam} />
              <Route exact path="/join" component={Join} />
              <Route exact path="/teamlist" component={TeamList} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settings" component={Settings} />
            </div>
          </Router>
        </>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
