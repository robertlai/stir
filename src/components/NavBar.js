import React from 'react';
import {Link, browserHistory } from 'react-router';
import 'whatwg-fetch';

const NavBar = React.createClass({
	handleLogout() {
		fetch('/auth/logout', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then((res) => {
			if(res.status == 200) {
				browserHistory.push('/login');
			}
		});
	},
	goHome() {
		browserHistory.push('/');
	},
	render() {
		return (
			<div id='navbar'>
				<button id='logout-button' onClick={this.handleLogout}>Logout</button>
				<button id='home-button' onClick={this.goHome}>Home</button>
			</div>
		);
	}
});

export default NavBar;
