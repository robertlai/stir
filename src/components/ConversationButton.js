import React from 'react';
import { browserHistory } from 'react-router';

const ConversationButton = React.createClass({
	enterConversation() {
		this.props.onSelect(this.props.index);
		browserHistory.push(`/conversation/${this.props.conversation_id}`)
	},
	render() {
		return (
			<button className={`conversation-button${this.props.selected ? ' selected' : ''}`} onClick={this.enterConversation} />
		);
	}
});

export default ConversationButton;

// { this.props.conversation_id }