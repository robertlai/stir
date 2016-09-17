import React from 'react';

// import MessageStream from 'components/MessageStream';
import BottomBar from 'components/BottomBar';

const ConversationView = React.createClass({
	render() {
		return (
			<div id="conversation-container">
				<BottomBar />
			</div>
		);
	}
});

export default ConversationView;
