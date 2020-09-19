import React, { useContext } from 'react';
import { Container, Button, Row } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect, useHistory } from 'react-router-dom';
import { AuthContext } from '../../Auth';
import firebase from 'firebase';

import 'react-bootstrap-typeahead/css/Typeahead.css';

const Home = () => {
	const history = useHistory();
	const authContext = useContext(AuthContext);
  authContext.setCurrentUser(firebase.auth().currentUser);
  console.log(authContext.currentUser);

	return (
		<section className="create-event-page m-xl-5">
			<Container>
				<h1>Join or Create an Event</h1>

				<Row className="mt-lg-3 mb-lg-3">
					<Button onClick={() => {}} variant="primary" size="lg">
						Join an Event
					</Button>
				</Row>
				<Row>
					<Button
						onClick={() => {
							history.push('/createevent');
						}}
						variant="outline-primary"
						size="lg"
					>
						Create an Event
					</Button>
				</Row>
			</Container>
		</section>
	);
};

export default Home;
