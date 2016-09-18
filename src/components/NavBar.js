import React from 'react';
import { Link, browserHistory } from 'react-router';
import 'whatwg-fetch';

import ConversationButton from 'components/ConversationButton';

const NavBar = React.createClass({
	getInitialState() {
		return {
			selectedIndex: -1
		};
	},
	handleLogout() {
		fetch(`${config.api_root}/auth/logout`, {
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
	select(i) {
		this.setState({
			selectedIndex: i
		});
	},
	render() {
		return (
			<div id='navbar'>
				{ this.props.conversation_ids.map((conversation_id, index) => {
					return <ConversationButton index={index} selected={index == this.state.selectedIndex} key={`button-${conversation_id}`} conversation_id={conversation_id} onSelect={this.select}/>;
				}) }
				<button id='logout-button' onClick={this.handleLogout}>Logout</button>
				<button id='home-button' onClick={this.goHome}>Home</button>
				<button id='secret-button' onClick={this.props.secret}>Home</button>
			</div>
		);
	}
});

export default NavBar;
