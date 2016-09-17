import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import 'whatwg-fetch';

import LoginView from 'views/LoginView';
import RegisterView from 'views/RegisterView';
import MainView from 'views/MainView';
import HomeView from 'views/HomeView';
import ConversationView from 'views/ConversationView';

function getUser() {
	return fetch('/auth/getUserStatus', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	}).then((res) => {
		return res.json();
	});
}

const checkAuth = (nextState, replace, callback) => {
	getUser().then((json) => {
		if(!json.loggedIn) {
			browserHistory.push('/login');
		}
		else {
			callback();
		}
	});
};

const Routes = (
	<Router history={browserHistory}>
		<Route path="/login" component={LoginView} />
		<Route path="/register" component={RegisterView} />
		<Route path="/" component={MainView}>
			<IndexRoute component={HomeView} onEnter={checkAuth} />
			<Route path="conversation/:cid" component={ConversationView} onEnter={checkAuth} />
		</Route>
	</Router>
);

export default Routes;
