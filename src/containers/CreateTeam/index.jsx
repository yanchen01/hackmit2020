import React, { useState, useRef, useEffect, useContext } from 'react';
import { InputGroup, FormControl, Container, Button, ButtonToolbar } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import './style.css';
import { Chip, Snackbar } from '@material-ui/core';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useSnackbar } from 'notistack';
import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { generateName } from '../../helpers/name';

import { AuthContext } from '../../Auth';

import { Redirect } from 'react-router-dom';

import {
	createTeam,
	getAllTeamsInEvent,
	removeMemberFromTeam,
	addMemberToTeam,
	addApplicationToTeam,
	updateTeam
} from '../../backend/Events/Teams/Teams';

const TAGS = [ 'AI', 'Community/Connectivity' ];

// have to add an input field to add a description in the frontend

// double check property eventId if it is passed correctly

const testEmailRegex = RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

const CreateTeam = (props) => {
	const authContext = useContext(AuthContext);
	let unauthenticated = null;

	const [ tags, setTags ] = useState(TAGS);
	const [ tagToAdd, setTagToAdd ] = useState([]);
	const [ email, setEmail ] = useState('');
	const [ members, setMembers ] = useState([]);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const onSubmit = (data) => {
		const { team, maxMembers } = data;
		// Adding the current user creating the team to the array of members
		const updateMembers = [ ...members ];
		updateMembers.push(firebase.auth().currentUser.uid);
		setMembers(updateMembers);

		const apiData = {
			teamId: uuidv4(),
			team,
			eventId: props.match.params.id,
			members,
			capacity: maxMembers,
			isFull: maxMembers === members.length,
			applications: [],
			tags
		};

		createTeam(
			apiData.teamId,
			apiData.team,
			apiData.eventId,
			apiData.members,
			apiData.capacity,
			apiData.isFull,
			apiData.applications,
			apiData.tags
		);

		props.history.push(`${props.history.location.pathname}/teamlist`);
	};

	const { register, handleSubmit, watch, setValue, errors } = useForm();

	useEffect(() => {
		unauthenticated = authContext.currentUser ? null : <Redirect to="/login" />;
		console.log('Auth: ', authContext.currentUser);
	}, []);

	// temp
	const MAX_MEMBERS = 4;

	const onDeleteTag = (tag) => {
		let currentTags = [ ...tags ];
		if (currentTags.includes(tag)) {
			currentTags = currentTags.filter((e) => e !== tag);
		}
		setTags(currentTags);
	};

	const onRandomizeTeamName = () => {
		const teamName = generateName();
		setValue('team', teamName);
	};

	const typeaheadRef = useRef();

	const onAddTag = (tag) => {
		if (tag[0]) {
			if (tag[0].length > 30) {
				enqueueSnackbar('Tag must be shorter!', {
					variant: 'error',
					onClick: () => closeSnackbar()
				});
			}
			if (tag[0].length > 0 && tags.length < 10 && tag[0].length < 30) {
				let currentTags = [ ...tags ];
				const doesHaveTag = currentTags.includes(tag[0]);
				if (!doesHaveTag) {
					currentTags = [ ...tags, ...tag ];
					setTags(currentTags);
					typeaheadRef.current.clear();
				}
			}
		}
	};

	// // Get all users
	// useEffect(() => {}, []);

	const onAddMember = (email) => {
		if (email.length > 0 && testEmailRegex.test(email)) {
			const currentMembers = [ ...members ];
			currentMembers.push(email);
			setMembers(currentMembers);
		} else {
			enqueueSnackbar('Invalid email!', {
				variant: 'error',
				onClick: () => closeSnackbar()
			});
		}
	};

	return (
		<section className="create-event-page m-xl-5">
			{unauthenticated}
			<Container>
				<h1>Create Team</h1>

				<div className="mt-lg-3 mb-lg-3">
					<label>Enter team name</label>
					<InputGroup>
						<FormControl
							name="team"
							ref={register({ min: 1, required: true, maxLength: 25 })}
							placeholder="Your team"
							aria-label="team"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					{errors.team && <span className="text-danger">This field is required (1-25 characters)</span>}
					<ButtonToolbar style={{ marginTop: '10px' }}>
						<Button onClick={onRandomizeTeamName} variant="outline-secondary">
							Randomize
						</Button>
					</ButtonToolbar>
				</div>

				{/* conditionally based on current event's max team member size */}
				<div className="mt-lg-3 mt-lg-3">
					<label>Max members</label>
					<InputGroup>
						<FormControl
							name="maxMembers"
							type="number"
							min={0}
							ref={register({ min: 2, max: MAX_MEMBERS, required: true })}
							placeholder="4"
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					{errors.maxMembers && <span className="text-danger">This field is required</span>}
				</div>

				<div className="mt-lg-3 mb-lg-3">
					<label>Add tags</label>
					<AsyncTypeahead
						clearButton
						id="tags-select"
						dropup
						isLoading={false}
						minLength={1}
						onSearch={(e) => {
							setTagToAdd([ e ]);
						}}
						onSubmit={() => onAddTag(tagToAdd)}
						options={[ 'ML', 'Health care', 'Urban Innovation', 'React', 'React Native', 'iOS', 'Android' ]}
						onChange={(e) => {
							setTagToAdd(e);
						}}
						ref={typeaheadRef}
					/>
					<ButtonToolbar style={{ marginTop: '10px' }}>
						<Button onClick={() => onAddTag(tagToAdd)} variant="outline-secondary">
							Add Tag
						</Button>
					</ButtonToolbar>
				</div>

				<div className="mt-lg-3 mb-lg-3">
					{tags.map((e, i) => (
						<Chip
							className="mr-2"
							label={e}
							key={`${e}-${i}`}
							variant="outlined"
							onDelete={() => onDeleteTag(e)}
						/>
					))}
				</div>

				<div className="mt-lg-3 mb-lg-3">
					<label>Add members</label>
					<InputGroup>
						<FormControl
							name="teamEmail"
							type="email"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder="yourteammember@gmail.com"
							aria-label="team"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					<ButtonToolbar style={{ marginTop: '10px' }}>
						<Button onClick={() => onAddMember(email)} variant="outline-secondary">
							Add Member
						</Button>
					</ButtonToolbar>
				</div>

				<div className="mt-lg-3 mb-lg-3">
					{members.map((e, i) => (
						<Chip
							className="mr-2"
							label={e}
							key={`${e}-${i}`}
							variant="outlined"
							onDelete={() => onDeleteTag(e)}
						/>
					))}
				</div>

				<div className="mt-lg-3 mb-lg-3">
					<Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg">
						Create Team
					</Button>
				</div>
			</Container>
			<Snackbar />
		</section>
	);
};

export default CreateTeam;
