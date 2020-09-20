import firebase from 'firebase';

const addUser = (uid, email, fullName) => {
	const db = firebase.firestore();
	const userDoc = [];
	let userID = null;

	const userRef = db.collection('users');
	userRef.doc(uid).set(
		{
			id: uid,
			email,
			fullName
		},
		{ merge: true }
	);
	// db
	// 	.collection('users')
	// 	.where('id', '==', uid)
	// 	.get()
	// 	.then((querySnapshot) => {
	// 		querySnapshot.forEach((res) => {
	// 			userDoc.push(res.data());
	// 			// console.log(res.data())
	// 		});
	// 		console.log('User doc: ', userDoc);

	// 		if (userDoc.length === 0) {

	// 		} else {
	// 			userRef.doc(uid).update({
	// 				id: uid,
	// 				email,
	// 				fullName
	// 			});
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
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
		.catch((err) => console.log('Error fetching email', err));

const getEventsCreated = (uid) => {
	// make a query to events user created
	const db = firebase.firestore();
	const userDoc = [];
	const eventsList = [];

	db
		.collection('users')
		.where('id', '==', uid)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((res) => {
				userDoc.push(res.data());
			});
			const eventRef = db.collection('events');

			userDoc[0].eventsCreated.forEach((eventID) => {
				eventRef
					.doc(eventID)
					.get()
					.then((res) => {
						eventsList.push(res.data());
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});

	return eventsList;
};

const getEventsJoined = (uid) => {
	// make a query to events user created
	const db = firebase.firestore();
	let eventsData = [];

	db.collection('users').doc(uid).get().then((res) => {
		res.eventsJoined.forEach((eventID) => {
			db
				.collection('events')
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
