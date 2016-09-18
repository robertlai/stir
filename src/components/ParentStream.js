import React from 'react';
import Message from 'components/Message';

const ParentStream = React.createClass({
	render() {
		console.log('parent');
		return (
			<div ref="container" className="message-container">
				{ this.props.conversations[this.props.conversation_id].map((message) => {
					return <Message key={`message-${message._id}`} message={message} />
				}) }
			</div>
		);
	}
});

export default ParentStream;
