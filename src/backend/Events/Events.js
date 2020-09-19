import firebase from 'firebase';

const addEvent = (name, eventCode, date, location = '', currentUserUID, links, categoryTags) => {
	firebase
		.firestore()
		.collection('events')
		.add({
			name,
			eventCode,
			date,
			location,
			organizer: currentUserUID,
			links,
			categoryTags: categoryTags,
			members: [],
			teams: []
		})
		.then((result) => {
			console.log(result);
			return result;
		})
		.catch((err) => {
			console.log(err);
		});
};

const editEvent = (eventID, updateObj) => {
	firebase
		.firestore()
		.collection('events')
		.doc(eventID)
		.update({
			updateObj
		})
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

const addEventMember = (eventID, memberUID) => {
	firebase
		.firestore()
		.collection('events')
		.doc(eventID)
		.update({
			members: firebase.firestore.FieldValue.arrayUnion(memberUID)
		})
		.then((result) => {
			console.log(result);
		})
		.catch((err) => {
			console.log(err);
		});
};

// const addEventTeam = (event_id, teamUID) => {
// 	firebase
// 		.firestore()
// 		.collection('events')
// 		.doc(event_id)
// 		.update({
// 			teams: firebase.firestore.FieldValue.arrayUnion(teamUID)
// 		})
// 		.then((result) => {
// 			console.log(result);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// };

export { addEvent, editEvent, addEventMember };
