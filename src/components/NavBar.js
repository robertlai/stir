import React from 'react';
import {Link, browserHistory } from 'react-router';
import 'whatwg-fetch';

const NavBar = React.createClass({
	getInitialState() {
		return {
			conversations: []
		};
	},
	componentDidMount() {
		this.fetchConversations();
	},
	fetchConversations() {
		fetch(`${config.api_root}/api/conversations/all`, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include'
		}).then((res) => {
			if(res.status == 200) {
				this.setState({
					conversations: res.body
				});
			}
		});
	},
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
				{ this.state.conversations.map((conversation) => {
					return 'hi';
				}) }
				<button id='logout-button' onClick={this.handleLogout}>Logout</button>
				<button id='home-button' onClick={this.goHome}>Home</button>
			</div>
		);
	}
});

export default NavBar;
