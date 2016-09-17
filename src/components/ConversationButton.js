import React from 'react';
import { browserHistory } from 'react-router';

const ConversationButton = React.createClass({
	enterConversation() {
		browserHistory.push(`/conversation/${this.props.conversation_id}`)
	},
	render() {
		return (
			<button className="conversation-button" onClick={this.enterConversation}>

			</button>
		);
	}
});

export default ConversationButton;

// { this.props.conversation_id }