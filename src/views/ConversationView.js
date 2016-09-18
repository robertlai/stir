import React from 'react';

import MessageStream from 'components/MessageStream';
import BottomBar from 'components/BottomBar';

const ConversationView = React.createClass({
	scrollAtBottom: true,
	getDefaultProps() {
		return {
			conversations: {},
			cleverMessage: ''
		};
	},
	getInitialState() {
		return {
			ready: false
		};
	},
	componentWillMount() {
		if(!this.state.ready && this.props.conversations[this.props.params.cid]) {
			this.setState({
				ready: true
			});
		}
	},
	componentDidMount() {
		this.refs.conversationScroll.scrollTop = this.refs.conversationScroll.scrollHeight;
	},
	componentWillReceiveProps(nextProps) {
		if(!this.state.ready && nextProps.conversations[nextProps.params.cid]) {
			this.setState({
				ready: true
			});
		}
		if(nextProps.cleverMessage != this.props.cleverMessage) {
			this.addNewMessage(nextProps.cleverMessage);
		}
	},
	componentDidUpdate() {
		if(this.scrollAtBottom) {
			this.refs.conversationScroll.scrollTop = this.refs.conversationScroll.scrollHeight;
		}
	},
	addNewMessage(message) {
		fetch(`${config.api_root}/api/messages/new`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify({
				_conversation: this.props.params.cid,
				messageContent: message
			})
		}).then((res) => {
			if(res.status == 201) {

			}
		});
	},
	toBottom() {
		this.scrollAtBottom = true;
	},
	onScroll() {
		const scrollTop = this.refs.conversationScroll.scrollTop;
		const scrollHeight = this.refs.stream.refs.container.clientHeight + 40;
		if(!this.scrollAtBottom && scrollTop >= scrollHeight) {
			this.scrollAtBottom = true;
		}
		else if(this.scrollAtBottom && scrollTop < scrollHeight) {
			this.scrollAtBottom = false;
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
