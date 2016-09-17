import React from 'react';
import { browserHistory } from 'react-router';
import 'whatwg-fetch';

const HomeView = React.createClass({
	handleSubmit(e) {
		e.preventDefault();
		this.startConversation(this.refs.input.value);
		this.refs.input.value = '';
	},
	startConversation(otherUserName) {
		fetch(`${config.api_root}/api/conversations/new`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				otherUserName: otherUserName
			}),
			credentials: 'include'
		}).then((res) => {
			if(res.status == 200) {
				res.json().then((body) => {
					browserHistory.push(`/conversation/${body.conversation_id}`);
				});
			}
		});
	},
	render() {
		return (
			<div id="home-container">
				<h1>Start a conversation...</h1>
				<form onSubmit={this.handleSubmit}>
					<input ref="input" className="start-input" type="text" placeholder="Find a user" />
				</form>
			</div>
		);
	}
});

export default HomeView;
