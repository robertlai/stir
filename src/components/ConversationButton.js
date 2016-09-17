import React from 'react';

const ConversationButton = React.createClass({
	render() {
		return (
			<button className="conversation-button">
				{this.props.conversation}
			</button>
		);
	}
});

export default ConversationButton;
