import React, { useContext, useEffect } from 'react';
import { InputGroup, FormControl, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import './style.css';
import Hamburger from '../Hamburger/hamburger';
// import { addEventMember } from '../../backend/Events/Events';
import firebase from 'firebase';

import { AuthContext } from '../../Auth';

import { Redirect } from 'react-router-dom';

const Join = (props) => {
	const authContext = useContext(AuthContext);
	let unauthenticated = null;

	const addEventMember = (eventCode, memberUID) => {
		let eventID;
		const eventQueried = [];

		firebase.firestore().collection('events').where('eventCode', '==', eventCode).get().then((eventResult) => {
			eventResult.forEach((res) => {
				eventQueried.push(res.id);
			});

			eventID = eventQueried[0];

			firebase.firestore().collection('events').doc(eventID).update({
				members: firebase.firestore.FieldValue.arrayUnion(memberUID)
			});

			firebase.firestore().collection('users').doc(memberUID).update({
				eventsJoined: firebase.firestore.FieldValue.arrayUnion(eventID)
			});
			props.history.push(`/event/${eventID}`);
		});
	};

	const onSubmit = (data) => {
		const { eventCode, name } = data;
		addEventMember(eventCode, firebase.auth().currentUser.uid);
	};

	const { register, handleSubmit, watch, errors } = useForm();

	useEffect(() => {
		unauthenticated = authContext.currentUser ? null : <Redirect to="/login" />;
		console.log('Auth: ', authContext.currentUser);
	}, []);

	return (
	<div>
		<Hamburger />
		<section className="join-event-page m-xl-5">
			{unauthenticated}
			<Container>
				<h1>Join Event</h1>

				<div className="mt-lg-3 mb-lg-3">
					<label>Enter event code</label>
					<InputGroup>
						<FormControl
							name="eventCode"
							ref={register({ min: 1, required: true, maxLength: 25 })}
							placeholder="hackmit2020"
							aria-label="eventcode"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
				</div>
				{errors.eventCode && <span className="text-danger">This field is required</span>}

				<div className="mt-lg-3 mt-lg-3">
					<label>What would you like your teammates to call you?</label>
					<InputGroup>
						<FormControl
							name="name"
							ref={register({ min: 3, max: 50, required: true })}
							placeholder="Alex"
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
				</div>
				{errors.name && <span className="text-danger">This field is required</span>}

				<div className="mt-lg-3 mb-lg-3">
					<Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg">
						Join
					</Button>
				</div>
			</Container>
		</section>
	</div>
	);
};

export default Join;
