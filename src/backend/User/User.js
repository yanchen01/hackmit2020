import firebase from "firebase";

const addUser = (uid, email, fullName) => {
  firebase.firestore().collection("users").doc(uid).set({
    id: uid,
    email,
    fullName,
  });
};

/**
 *
 * @param email: string             A valid email
 * @returns {Promise<T | string[]>} If string[] is empty, user doesn't exist
 */
const checkUserAlreadyExists = (email) =>
  firebase
    .auth()
    .fetchSignInMethodsForEmail(email)
    .then((res) => res)
    .catch((err) => console.log("Error fetching email", err));

const getEventsCreated = (uid) => {
  // make a query to events user created
  const db = firebase.firestore();
  let eventIDList = [];
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

export { addUser, getEventsCreated, getEventsJoined, checkUserAlreadyExists };
