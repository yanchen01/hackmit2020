import firebase from "firebase";

const addUser = (uid, email, fullName) => {
  firebase.firestore().collection("users").doc(uid).set({
    id: uid,
    email,
    fullName,
  });
};

const getEventsCreated = (uid) => {
  // make a query to events user created
  const db = firebase.firestore();
  let eventsData = [];

  db.collection("users")
    .doc(uid)
    .get()
    .then((res) => {
      res.eventsCreated.forEach((eventID) => {
        db.collection("events")
          .doc(eventID)
          .get()
          .then((result) => {
            eventsData.push(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      return eventsData;
    });
};

const getEventsJoined = (uid) => {
  // make a query to events user created
  const db = firebase.firestore();
  let eventsData = [];

  db.collection("users")
    .doc(uid)
    .get()
    .then((res) => {
      res.eventsJoined.forEach((eventID) => {
        db.collection("events")
          .doc(eventID)
          .get()
          .then((result) => {
            eventsData.push(result);
          })
          .catch((err) => {
            console.log(err);
          });
      });
      return eventsData;
    });
};

export { addUser, getEventsCreated, getEventsJoined };
