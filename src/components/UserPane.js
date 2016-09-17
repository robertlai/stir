import React from 'react';

const UserPane = React.createClass({
	getDefaultProps() {
		return {
			user: {}
		};
	},
	createConversation() {

	},
	render() {
		return (
			<div className="user-pane">
				{ this.props.user.username }
				<button onClick={this.createConversation()} />
			</div>
		);
	}
});

export default UserPane;
