import React, { useContext, useEffect, useState } from 'react';
import { Container, Button, Row, Navbar, Image, Nav, Col } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import 'react-bootstrap-typeahead/css/Typeahead.css';

// Drawer/HAMBURGER menu
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { GitHub, Menu } from '@material-ui/icons';

import logo from '../../assets/logo-t.png';
import { AuthContext } from '../../Auth';
import NonEventDrawer from '../../components/NonEventDrawer';
import { getEventsCreated } from '../../backend/User/User';

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
			<Navbar bg="light" varient="light">
				<Navbar.Brand href="/">
					<Image src={logo} className="logo" />
					Lobby
				</Navbar.Brand>
				<Navbar.Collapse className="justify-content-end">
					<Nav>
						<Nav.Link href="https://github.com/yanchen01/hackmit2020">
							<GitHub />
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
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
