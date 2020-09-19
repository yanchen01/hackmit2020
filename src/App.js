import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase';

/* Import containers */
import Home from './containers/Home/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';

/* Import Auth */
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';

const firebaseConfig = {
	apiKey: 'AIzaSyD-w8z8ollWZttoETyFL7Zkk-FVnhZoKdw',
	authDomain: 'hackmit2020-a3fb0.firebaseapp.com',
	databaseURL: 'https://hackmit2020-a3fb0.firebaseio.com',
	projectId: 'hackmit2020-a3fb0',
	storageBucket: 'hackmit2020-a3fb0.appspot.com',
	messagingSenderId: '295002459820',
	appId: '1:295002459820:web:4f63a761bb6e0d1339d909'
};

firebase.initializeApp(firebaseConfig);

const App = () => {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/" component={Home} />
					<Route exact path="/signup" component={SignUp} />
				</div>
			</Router>
		</AuthProvider>
	);
};

export default App;
