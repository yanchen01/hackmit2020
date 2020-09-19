import firebase from "firebase";

const applyToTeam = (applicantId, teamId, eventId, message) => {
  firebase
    .firestore()
    .collection("applications")
    .add({
      applicantId: applicantId,
      status: "Pending",
      message: message,
    })
    .then((result) => {
      // TODO: call update method from the Teams.js file to update the Team object with a new application added to its array of applications
    })
    .catch((error) => console.log(error));
};

// this is called by the team to which the application was made; they update the application STATUS
// either accept or reject application
const updateApplication = (applicationId, teamId, status) => {
  firebase
    .firestore()
    .collection("applications")
    .doc(applicationId)
    .update({
      status: status,
    })
    .then((applicationId) => {
      if (status === "Accepted") {
        // if it is accepted, we need to update each other application to the team to be rejected
        firebase
          .firestore()
          .collection("teams")
          .doc(teamId)
          .get()
          .then((result) => {
            result.applications.forEach(function (appId) {
              if (appId !== applicationId) {
                firebase
                  .firestore()
                  .collection("applications")
                  .doc(appId)
                  .update({
                    status: "Rejected",
                  })
                  .then((appRes) => {
                    appList.push(appRes);
                  })
                  .catch((error) => console.log(error));
              }
              return appList;
            });
          })
          .catch((error) => console.log(error));
      }
    });
};

// firebase.firestore().collection("applications").doc(appId).update({
//                 status: "Rejected"
//             }).then(() => {})
//             .catch((error) => console.log(error))

// this one might need to also take in the current User id to check if
// this user is allowed to view applications for this team
const getAllApplicationsToTeam = (teamId) => {
  firebase
    .firestore()
    .collection("teams")
    .doc(teamId)
    .get()
    .then((result) => {
      appList = [];
      result.applications.forEach(function (appId) {
        firebase
          .firestore()
          .collection("applications")
          .doc(appId)
          .get()
          .then((appRes) => {
            appList.push(appRes);
          });
      });
      return appList;
    })
    .catch((error) => console.log(error));
};

export { getAllApplicationsToTeam, updateApplication, applyToTeam };
