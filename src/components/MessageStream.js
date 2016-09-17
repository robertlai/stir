import React from 'react';
import Message from 'components/Message';

const MessageStream = React.createClass({
	render() {
		var parentStreams = this.props.conversation.parents && this.props.depth === 0 ?
			<div>
				<MessageStream depth={this.props.depth - 1}/>
				<MessageStream depth={this.props.depth - 1}/>
			</div> :
			<div/>
		return (
			<div ref="container" className="message-container">
				{ this.props.conversation.map((message) => {
					return <Message key={`message-${message._id}`} message={message} />
				}) }
			</div>
		);
	}
});

export default MessageStream;