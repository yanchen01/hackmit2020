import firebase from "firebase";

// every member of the team can update the team
const updateTeam = (teamId, teamName, capacity, teamTags) => {
  firebase
    .firestore()
    .collection("teams")
    .doc(teamId)
    .update({
      teamName: teamName,
      capacity: capacity,
      teamTags: teamTags,
    })
    .then(() => {})
    .catch((error) => console.log(error));
};

// // no need to remove an application, we can keep it in the history of applications and just mark it as rejected
// const addApplicationToTeam = (teamId, applicationId) => {
//   firebase
//     .firestore()
//     .collection("teams")
//     .doc(teamId)
//     .update({
//       applications: firebase.firestore.FieldValue.arrayUnion(applicationId),
//     })
//     .then(() => {})
//     .catch((error) => console.log(error));
// };

// this is to join team
const addMemberToTeam = (teamId, newMemberId) => {
  firebase
    .firestore()
    .collection("teams")
    .doc(teamId)
    .update({
      members: firebase.firestore.FieldValue.arrayUnion(newMemberId),
    })
    .then((res) => console.log("RES", res))
    .catch((error) => console.log("ERROR ADDING MEMBER TO TEAM", error));
};

// const removeMemberFromTeam = (teamId, removedMemberId) => {
//   firebase
//     .firestore()
//     .collection("teams")
//     .doc(teamId)
//     .update({
//       members: firebase.firestore.FieldValue.arrayRemove(removedMemberId),
//     })
//     .then(() => {})
//     .catch((error) => console.log(error));
// };

const createTeam = (
  teamId,
  teamName,
  eventId,
  members,
  capacity,
  isFull,
  applications,
  teamTags
) =>
  firebase
    .firestore()
    .collection("teams")
    .doc(teamId)
    .set({
      name: teamName,
      eventId: eventId,
      members: members,
      capacity: capacity,
      isFull: isFull,
      teamTags: teamTags,
      applications: applications,
    })
    .then((result) => {
      return result;
    })
    .catch((error) => console.log(error));

const getAllTeamsInEvent = (eventId) => {
  const teams = [];

  firebase
    .firestore()
    .collection("teams")
    .where("eventId", "==", eventId)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((element) => {
        teams.push(element.data());
      });
    })
    .catch((err) => {
      console.log(err);
    });

  return teams;
};

const getAllTeamsByUserID = (userId) =>
  firebase.firestore().collection("teams").where("members", "contains", userId);

export {
  createTeam,
  getAllTeamsInEvent,
  // removeMemberFromTeam,
  addMemberToTeam,
  // addApplicationToTeam,
  updateTeam,
};
