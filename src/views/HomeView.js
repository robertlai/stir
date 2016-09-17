import React from 'react';

const HomeView = React.createClass({
	render() {
		console.log('ok')
		return (
			<div id='home-container'>
				<h1>Start a conversation...</h1>
				<input className="start-input" type="text" placeholder="Find a user" />
			</div>
		);
	}
});

export default HomeView;