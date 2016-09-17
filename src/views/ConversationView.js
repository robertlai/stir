import React from 'react';

import MessageStream from 'components/MessageStream';
import BottomBar from 'components/BottomBar';

const ConversationView = React.createClass({
	getDefaultProps() {
		return {
			conversations: {}
		};
	},
	componentDidMount() {

	},
	render() {
		console.log('ok');
		console.log(this.props.conversations);
		return (
			<div id="conversation-container">
				<div id="conversation-inner">
					<MessageStream conversation={this.props.conversations[this.props.params.cid]} depth={0} />
				</div>
				<BottomBar conversation_id={this.props.params.cid}/>
			</div>
		);
	}
});

export default ConversationView;
