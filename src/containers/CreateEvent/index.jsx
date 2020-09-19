import React, { useState } from 'react';

import { InputGroup, Row, FormControl, Container, Button, Form, FormGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import firebase from 'firebase';
import './style.css';
import 'react-datepicker/dist/react-datepicker.css';

const MAX_MEMBERS_PER_TEAM_OPTIONS = [ 'Let members choose up to max', 'Max required' ];

const CreateEvent = () => {
	const [ isMaxMembersPerTeamEnabled, setIsMaxMembersPerTeamEnabled ] = useState(false);

	const initialStartDate = new Date();
	let initialEndDate = new Date();
	initialEndDate.setDate(initialStartDate.getDate() + 1);
	const [ eventStartDate, setEventStartDate ] = useState(initialStartDate);
	const [ eventEndDate, setEventEndDate ] = useState(initialEndDate);
	const onSubmit = (data) => {
		const { eventCode, name, maxTeams, maxUsersPerTeam } = data;
		const apiData = {
			eventCode,
			name,
			maxTeams,
			maxUsersPerTeam,
			date: {
				startDate: eventStartDate.toISOString().substring(0, 10),
				endDate: eventEndDate.toISOString().substring(0, 10)
			},
			currentUser: firebase.auth().currentUser.uid,
			isMaxMembersPerTeamEnabled
		};
	};

	const { register, handleSubmit, watch, errors } = useForm();

	const onPressMultiSelect = (val) => {
		if (val === MAX_MEMBERS_PER_TEAM_OPTIONS[0]) {
			setIsMaxMembersPerTeamEnabled(false);
		} else {
			setIsMaxMembersPerTeamEnabled(true);
		}
	};

	const onChangeEventStartDate = (date) => {
		setEventStartDate(date);
	};

	const onChangeEventEndDate = (date) => {
		setEventEndDate(date);
	};

	const eventCodeWatcher = watch('eventCode');

	return (
		<section className="create-event-page m-xl-5">
			<Container>
				<h1>Create Event</h1>

				<div className="mt-lg-3 mb-lg-3">
					<label>Enter event name</label>
					<InputGroup>
						<FormControl
							name="eventCode"
							ref={register({ min: 1, required: true, maxLength: 25 })}
							placeholder="hackmit2020"
							aria-label="eventcode"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					{errors.eventCode && <span className="text-danger">This field is required</span>}
				</div>

				<div className="mt-lg-3 mt-lg-3">
					<label>Enter a memorable event code</label>
					<InputGroup>
						<FormControl
							name="name"
							ref={register({ min: 3, max: 50, required: true })}
							placeholder={eventCodeWatcher || 'myevent'}
							aria-label="Username"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					{errors.name && <span className="text-danger">This field is required</span>}
				</div>

				<div className="mt-lg-3 mt-lg-3">
					<label>Max teams? (2-1000)</label>
					<InputGroup>
						<FormControl
							name="maxTeams"
							type="number"
							ref={register({
								min: 2,
								max: 1000,
								required: true
							})}
							placeholder="100"
							aria-label="teams"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					{errors.maxTeams && <span className="text-danger">This field is required</span>}
				</div>

				<div className="mt-lg-3 mt-lg-3">
					<label>Max members per team? (2-50)</label>
					<InputGroup>
						<FormControl
							name="maxUsersPerTeam"
							type="number"
							ref={register({ min: 2, max: 50, required: true })}
							placeholder="4"
							aria-label="usersPerTeam"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					{errors.maxUsersPerTeam && <span className="text-danger">This field is required</span>}
				</div>

				<div className="form-group mt-lg-3 mb-lg-3">
					<label htmlFor="exampleFormControlSelect2">Max members per team?</label>
					<select
						onChange={(e) => onPressMultiSelect(e.target.value)}
						multiple
						className="form-control"
						id="exampleFormControlSelect2"
					>
						{MAX_MEMBERS_PER_TEAM_OPTIONS.map((e, i) => <option key={`${e}-${i}`}>{e}</option>)}
					</select>
				</div>

				<div className="mt-lg-3 mb-lg-3">
					<label>Event start date</label>
					<FormGroup>
						<DatePicker selected={eventStartDate} onChange={onChangeEventStartDate} />
					</FormGroup>
				</div>

				<div className="mt-lg-3 mb-lg-3">
					<label>Event end date</label>
					<FormGroup>
						<DatePicker selected={eventEndDate} onChange={onChangeEventEndDate} />
					</FormGroup>
				</div>

				<div className="mt-lg-3 mb-lg-3">
					<Button onClick={handleSubmit(onSubmit)} variant="primary" size="lg">
						Create
					</Button>
				</div>
			</Container>
		</section>
	);
};

export default CreateEvent;
