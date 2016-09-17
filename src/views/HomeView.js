import React from 'react';
import 'whatwg-fetch';

const HomeView = React.createClass({
	startConversation() {
		fetch(`${config.api_root}/api/conversations/new`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				otherUserName: 'Justin'
			}),
			credentials: 'include'
		}).then((res) => {
			if(res.status == 200) {

			}
		});
	},
	render() {
		return (
			<div id="home-container">
				<h1>Start a conversation...</h1>
				<input className="start-input" type="text" placeholder="Find a user" />
			</div>
		);
	}
});

export default HomeView;
