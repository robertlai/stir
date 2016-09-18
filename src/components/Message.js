import React from 'react';

const Message = React.createClass({
	render() {
		console.log('message');
		return (
			<div className={`message${user.username == this.props.message._user.username ? ' my-message' : ''}`}>
				<h2>{ this.props.message._user.username }</h2>
				<div>{ this.props.message.content }</div>
			</div>
		);
	}
});

export default Message;
