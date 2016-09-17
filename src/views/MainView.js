import React from 'react';
import NavBar from 'components/NavBar';
import { getUser } from 'utils';

const MainView = React.createClass({
	getInitialState() {
		return {
			conversation_ids: [],
			conversations: {}
		};
	},
	componentDidMount() {
		this.fetchConversations();
	},
	setMessages(conversation_id, messages) {
		var newState = this.state;
		if(this.state.conversations[conversation_id]) {
			newState.conversations[conversation_id] = newState.conversations[conversation_id].concat(messages);
		}
		else {
			newState.conversations[conversation_id] = messages;
		}
		this.setState(newState);
	},
	setConversations(conversation_ids) {
		if(conversation_ids) {
			this.setState({
				conversation_ids: conversation_ids
			});
			conversation_ids.forEach((conversation_id) => {
				socket.emit('conversationConnect', conversation_id);
			});
		}
	},
	addConversation(conversation_id) {
		this.setState({
			conversation_ids: this.state.conversation_ids.concat(conversation_id)
		});
		socket.emit('conversationConnect', conversation_id);
	},
	fetchConversations() {
		getUser().then((user) => {
			global.user = user.user;
			socket.on('newMessages', this.setMessages);
			socket.on('allConversationIds', this.setConversations);
			socket.on('newConversation', this.addConversation);
			socket.emit('conversationSubscribe', user.user);
			socket.on('error', () => {
				console.log('error');
			});
		});
	},
	render() {
		return (
			<div id="main-container">
				<NavBar conversation_ids={this.state.conversation_ids} />
				<div id="view-container">
					{ React.cloneElement(this.props.children, {conversations: this.state.conversations}) }
				</div>
			</div>
		);
	}
});

export default MainView;
