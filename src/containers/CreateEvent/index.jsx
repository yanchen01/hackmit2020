import React, { useState } from 'react';
import { InputGroup, Row, FormControl, Container, FormLabel, Button, FormGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import firebase from 'firebase';
import './style.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { addEvent } from '../../backend/Events/Events';
import { v4 as uuidv4 } from 'uuid';

const MAX_MEMBERS_PER_TEAM_OPTIONS = [ 'Let members choose up to max', 'Max required' ];

const CreateEvent = (props) => {
	const [ isMaxMembersPerTeamEnabled, setIsMaxMembersPerTeamEnabled ] = useState(false);

	const initialStartDate = new Date();
	let initialEndDate = new Date();
	initialEndDate.setDate(initialStartDate.getDate() + 1);
	const [ eventStartDate, setEventStartDate ] = useState(initialStartDate);
	const [ eventEndDate, setEventEndDate ] = useState(initialEndDate);
	const [ categorySingleSelection, setCategorySingleSelection ] = useState([]);
	const [ location, setLocation ] = useState('');

	const onSubmit = (data) => {
		const { eventCode, name, maxTeams, maxUsersPerTeam, link } = data;
		const apiData = {
			name,
			eventCode,
			eventID: uuidv4(),
			maxTeams,
			maxUsersPerTeam,
			date: {
				startDate: eventStartDate.toISOString().substring(0, 10),
				endDate: eventEndDate.toISOString().substring(0, 10)
			},
			isMaxMembersPerTeamEnabled,
			categorySingleSelection, // []
			location,
			link,
			uid: firebase.auth().currentUser.uid
		};

		addEvent(
			apiData.name,
			apiData.eventID,
			apiData.eventCode,
			apiData.date,
			apiData.location,
			apiData.uid,
			apiData.link,
			apiData.categorySingleSelection
		);

		console.log();

		props.history.push(`${props.history.location.pathname}/${apiData.eventID}`);
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

	// const getCurrentLocation = () => {
	//   if ("geolocation" in navigator) {
	//     navigator.geolocation.getCurrentPosition((pos) => {
	//       setLocation(pos);
	//       console.log("loc1", pos)
	//     });
	//   } else {
	//     console.log("loc 0");
	//   }
	// };
	//
	// useEffect(() => {
	//
	// }, [location])

	return (
		<section className="create-event-page m-xl-5">
			<Container>
				<h1>Create Event</h1>

				<div className="mt-lg-3 mb-lg-3">
					<label>Enter event name</label>
					<InputGroup>
						<FormControl
							name="eventCode"
							type="text"
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
							type="text"
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

				<div>
					<FormGroup>
						<FormLabel>Category</FormLabel>
						<Typeahead
							id="basic-typeahead-single"
							labelKey="name"
							onChange={setCategorySingleSelection}
							options={[ 'Hackathon' ]}
							placeholder="Choose a category..."
							selected={categorySingleSelection}
						/>
					</FormGroup>
				</div>

				<div>
					<FormGroup>
						<FormLabel>Location</FormLabel>
						<InputGroup>
							<FormControl
								name="location"
								type="text"
								ref={register({
									min: 2,
									max: 1000
								})}
								placeholder="Boston, MA"
								aria-label="location"
								aria-describedby="basic-addon1"
							/>
						</InputGroup>
						{/*<ButtonToolbar style={{ marginTop: "10px" }}>*/}
						{/*  <Button*/}
						{/*    onClick={() => getCurrentLocation()}*/}
						{/*    variant="outline-secondary"*/}
						{/*  >*/}
						{/*    Get location*/}
						{/*  </Button>*/}
						{/*</ButtonToolbar>*/}
					</FormGroup>
				</div>

				<FormGroup>
					<FormLabel>An easy link for others to join</FormLabel>
					<InputGroup>
						<FormControl
							name="link"
							type="url"
							ref={register({
								min: 2,
								max: 1000
							})}
							placeholder="https://discord.gg/somelink"
							aria-label="link"
							aria-describedby="basic-addon1"
						/>
					</InputGroup>
					{/*<ButtonToolbar style={{ marginTop: "10px" }}>*/}
					{/*  <Button*/}
					{/*    onClick={() => getCurrentLocation()}*/}
					{/*    variant="outline-secondary"*/}
					{/*  >*/}
					{/*    Get location*/}
					{/*  </Button>*/}
					{/*</ButtonToolbar>*/}
				</FormGroup>

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
