import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Row, Navbar, Image, Nav, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import Hamburger from '../Hamburger/hamburger'

import 'react-bootstrap-typeahead/css/Typeahead.css';

import { GitHub } from '@material-ui/icons';

import logo from '../../assets/logo-t.png';
import { AuthContext } from '../../Auth';
// import NonEventDrawer from '../../components/NonEventDrawer';
// import { getEventsCreated } from '../../backend/User/User';

const Home = () => {
	const history = useHistory();
	const authContext = useContext(AuthContext);
	const [ user, setUser ] = useState('');

	useEffect(() => {
		console.log('Home from Auth: ', authContext.currentUser);
		let currentUser = authContext.currentUser;
		if (currentUser) {
			const { displayName, email, emailVerified } = currentUser;
			setUser(displayName);
		}
	}, []);

	const onLogout = () => {
		firebase
			.auth()
			.signOut()
			.then((res) => {
				console.log('signed out', res);
				authContext.setCurrentUser(null);
			})
			.catch((err) => {
				console.log('error signing out', err);
			});
	};

	return (
		<section className="create-event-page">
			<Hamburger />
			<Container className="my-5">
				<h1>
					{user && `Welcome ${user}, `}
					Join or Create an Event
				</h1>

				<Row className="mt-5">
					<Button
						onClick={() => {
							history.push('/profile');
						}}
						variant="danger"
						size="lg"
					>
						Profile
					</Button>
				</Row>

				<Row className="my-lg-3">
					<Button
						onClick={() => {
							history.push('/join');
						}}
						variant="primary"
						size="lg"
					>
						Join an Event
					</Button>
				</Row>
				<Row>
					<Button
						onClick={() => {
							history.push('/event');
						}}
						variant="outline-primary"
						size="lg"
					>
						Create an Event
					</Button>
				</Row>
				<Row className="mt-5">
					<Button onClick={onLogout} variant="danger" size="lg">
						Sign out
					</Button>
				</Row>
			</Container>
		</section>
	);
};

export default Home;
