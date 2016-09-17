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
			ready: false,
			scrollAtBottom: true
		};
	},
	componentWillReceiveProps(nextProps) {
		if(!this.state.ready && nextProps.conversations[nextProps.params.cid]) {
			this.setState({
				ready: true
			});
		}
	},
	componentDidUpdate() {
		if(this.state.scrollAtBottom) {
			this.refs.conversationScroll.scrollTop = this.refs.conversationScroll.scrollHeight;
		}
	},
	toBottom() {
		this.setState({
			scrollAtBottom: true
		});
	},
	onScroll() {
		const scrollTop = this.refs.conversationScroll.scrollTop;
		const scrollHeight = this.refs.stream.refs.container.clientHeight + 40;
		if(!this.state.scrollAtBottom && scrollTop >= scrollHeight) {
			this.setState({
				scrollAtBottom: true
			});
		}
		else if(this.state.scrollAtBottom && scrollTop < scrollHeight) {
			this.setState({
				scrollAtBottom: false
			});
		}
	},
	render() {
		return (
			<div id="conversation-container">
				<div ref="conversationScroll" id="conversation-inner" onScroll={this.onScroll}>
					{
						this.state.ready && <MessageStream ref="stream" conversation={this.props.conversations[this.props.params.cid]} depth={0} />
					}
				</div>
				<BottomBar conversation_id={this.props.params.cid} onSubmit={this.toBottom}/>
			</div>
		);
	}
});

export default ConversationView;
