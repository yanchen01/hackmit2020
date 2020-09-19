import firebase from "firebase";

// need to make update methods for a team later
// const updateTeam = ()

const createTeam = (
  teamName,
  eventId,
  members,
  description,
  capacity,
  isFull,
  applications,
  teamTags
) =>
  firebase
    .firestore()
    .collection("teams")
    .add({
      name: teamName,
      eventId: eventId,
      members: members,
      description: description,
      capacity: capacity,
      isFull: isFull,
      teamTags: teamTags,
      applications: applications,
    })
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));

const getAllTeamsInEvent = (eventId) =>
  firebase
    .firestore()
    .collection("teams")
    .where("eventId", "==", eventId)
    .get()
    .then((querySnapshot) => {
      return querySnapshot;
    })
    .catch((error) => console.log(error));

export { createTeam, getAllTeamsInEvent };
