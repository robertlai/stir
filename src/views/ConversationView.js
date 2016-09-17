import React from 'react';

import MessageStream from 'components/MessageStream';
import BottomBar from 'components/BottomBar';

const ConversationView = React.createClass({
	getDefaultProps() {
		return {
			conversations: {}
		};
	},
	getInitialState() {
		return {
			ready: false
		};
	},
	componentWillReceiveProps(nextProps) {
		if(!this.state.ready && nextProps.conversations[nextProps.params.cid]) {
			this.setState({
				ready: true
			});
		}
	},
	render() {
		return (
			<div id="conversation-container">
				<div id="conversation-inner">
					{
						this.state.ready && <MessageStream conversation={this.props.conversations[this.props.params.cid]} depth={0} />
					}
				</div>
				<BottomBar conversation_id={this.props.params.cid}/>
			</div>
		);
	}
});

export default ConversationView;
