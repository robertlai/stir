import React from 'react';
import { browserHistory } from 'react-router'
import NavBar from 'components/NavBar';
import { getUser, cleverBot } from 'utils';

const MainView = React.createClass({
	lastMergedId: '',
	getInitialState() {
		return {
			conversation_ids: [],
			conversations: {},
			clever: false,
			cleverMessage: ''
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
		if(this.state.clever && messages[messages.length-1]._user._id != user._id) {
			cleverBot(messages[messages.length-1].content).then((res) => {
				res.json().then((body) => {
					this.setState({
						cleverMessage: body.message
					});
				});
			});
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
	mergeNotification(merge) {
		const { _oldConversation1, _oldConversation2, newConversation } = merge;
		var newState = this.state;
		if(this.lastMergedId != newConversation._id) {
			this.lastMergedId = newConversation._id;
			newState.conversation_ids.push(newConversation._id);
			socket.emit('conversationConnect', newConversation._id);
			browserHistory.push(`/conversation/${newConversation._id}`);
		}
		newState.conversation_ids = _.difference(newState.conversation_ids, [_oldConversation1, _oldConversation2]);
		this.setState(newState);
	},
	fetchConversations() {
		getUser().then((u) => {
			global.user = u.user;
			socket.on('newMessages', this.setMessages);
			socket.on('allConversationIds', this.setConversations);
			socket.on('newConversation', this.addConversation);
			socket.on('mergeNotification', this.mergeNotification);
			socket.emit('conversationSubscribe', u.user);
			socket.on('error', () => {
				console.log('error');
			});
		});
	},
	toggleCleverBot() {
		this.setState({
			clever: !this.state.clever
		});
	},
	render() {
		return (
			<div id="main-container">
				<NavBar conversations={this.state.conversations} conversation_ids={this.state.conversation_ids} secret={this.toggleCleverBot} />
				<div id="view-container">
					{ React.cloneElement(this.props.children, {conversations: this.state.conversations, cleverMessage: this.state.cleverMessage}) }
				</div>
			</div>
		);
	}
});

export default MainView;
