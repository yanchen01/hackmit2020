import React, { useCallback } from 'react';
import { Redirect, withRouter } from 'react-router';
import firebase from 'firebase';

const SignUp = ({ history }) => {
	const handleSignUp = useCallback(
		async (event) => {
			event.preventDefault();
			const { email, password, fullName } = event.target.elements;
			try {
				await firebase
					.auth()
					.createUserWithEmailAndPassword(email.value, password.value)
					.then((res) => {
						const uid = res.user.uid;
						const data = {
							id: uid,
							email: email.value,
							fullName: fullName.value
						};
						const userRef = firebase.firestore().collection('users');

						userRef
							.doc(uid)
							.set(data)
							.then((res) => {
								return <Redirect to="/" />;
							})
							.catch((err) => {
								console.log(err);
							});
					})
					.catch((err) => {
						console.log(err);
					});
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[ history ]
	);

	return (
		<div>
			<h1>Sign up</h1>
			<form onSubmit={handleSignUp}>
				<label>
					Full Name
					<input name="fullName" type="text" placeholder="Full Name" />
				</label>
				<label>
					Email
					<input name="email" type="email" placeholder="Email" />
				</label>
				<label>
					Password
					<input name="password" type="password" placeholder="Password" />
				</label>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
};

export default withRouter(SignUp);
