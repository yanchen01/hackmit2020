import react, { useContext } from 'react';
import firebase from 'firebase';

const addEvent = (name, eventID, eventCode, date, location = '', currentUserUID, link = '', category = '') => {
	firebase.firestore().collection('events').doc(eventID).set({
		name,
		eventCode,
		date,
		location,
		organizer: currentUserUID,
		link,
		category,
		members: [],
		teams: []
	});

	firebase.firestore().collection('users').doc(currentUserUID).update({
		eventsCreated: firebase.firestore.FieldValue.arrayUnion(eventID)
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

// join
const addEventMember = (eventCode, memberUID) => {
	const eventQueried = [];
	firebase.firestore().collection('events').where('eventCode', '==', eventCode).get().then((eventResult) => {
		eventResult.forEach((res) => {
			eventQueried.push(res.id);
		});

		firebase
			.firestore()
			.collection('events')
			.doc(eventQueried[0])
			.update({
				members: firebase.firestore.FieldValue.arrayUnion(memberUID)
			})
			.then((result) => {});

		firebase
			.firestore()
			.collection('users')
			.doc(memberUID)
			.update({
				eventsJoined: firebase.firestore.FieldValue.arrayUnion(eventQueried[0])
			})
			.then((result) => {});
	});
	console.log(eventQueried);
	return eventQueried;
};

const getEventById = (eventID) => {
	firebase
		.firestore()
		.collection('events')
		.doc(eventID)
		.get()
		.then((response) => {
			return response;
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

export { addEvent, editEvent, addEventMember, getEventById };
