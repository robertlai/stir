import React from 'react';
import Message from 'components/Message';

const MessageStream = React.createClass({
	render() {
		var parentStreams = this.props.depth === 0 ?
			<div>
				<MessageStream count={this.props.count - 1}/>
				<MessageStream count={this.props.count - 1}/>
			</div> :
			<div/>
		return (
			<div className="message-container">
				{ this.props.conversation.map((message) => {
					return <Message key={`message-${message._id}`} message={message} />
				}) }
			</div>
		);
	}
});

export default MessageStream;