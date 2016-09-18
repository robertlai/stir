import React from 'react';
import Message from 'components/Message';

const MessageStream = React.createClass({
	render() {
		var parentStreams = <div/>;

		if(this.props.conversation_props && this.props.conversation_props._parents && this.props.depth === 0) {
			parentStreams = (
				<div>
				{
					this.props.conversation_props._parents.map((parent, index) => {
						return <MessageStream depth={this.props.depth + 1} conversations={this.props.conversations} key={`msgparent-${index}`} conversation_id={parent} depth={this.props.depth + 1} />
					})
				}
				</div>
			);
		}
		return (
			<div>
				{ parentStreams }
				<div ref="container" className={`message-container${this.props.depth > 0 ? ' half-width' : ''}`} >
					{ this.props.conversations[this.props.conversation_id] && this.props.conversations[this.props.conversation_id].map((message) => {
						return <Message key={`message-${this.props.conversation_id}-${message._id}-${this.props.depth}`} message={message} />
					}) }
				</div>
			</div>
		);
	}
});

export default MessageStream;