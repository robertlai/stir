import React from 'react';
import { browserHistory } from 'react-router'
import NavBar from 'components/NavBar';
import { getUser, cleverBot } from 'utils';

const MainView = React.createClass({
	lastMergedId: '',
	getInitialState() {
		return {
			conversation_props: {},
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
			newState.conversations[conversation_id] = _.uniqBy(newState.conversations[conversation_id].concat(messages), '_id');
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
	setConversations(conversation_props) {
		if(conversation_props) {
			this.setState({
				conversation_props: _.keyBy(conversation_props, '_id')
			});
			conversation_props.forEach((conversation_prop) => {
				socket.emit('conversationConnect', conversation_prop._id);
			});
		}
	},
	addConversation(conversation_prop) {
		var newState = this.state;
		newState.conversation_props[conversation_prop._id] = conversation_prop;
		newState.conversations[conversation_prop._id] = [];
		this.setState(newState);
		socket.emit('conversationConnect', conversation_prop._id);
	},
	mergeNotification(merge) {
		const { _oldConversation1, _oldConversation2, newConversation } = merge;
		var newState = this.state;
		if(this.lastMergedId != newConversation._id) {
			this.lastMergedId = newConversation._id;
			newState.conversation_props[newConversation._id] = newConversation;
			newState.conversations[newConversation._id] = [];
			socket.emit('conversationConnect', newConversation._id);
			browserHistory.push(`/conversation/${newConversation._id}`);
		}
		if(newState.conversation_props[_oldConversation1]) {
			newState.conversation_props[_oldConversation1].isMerged = true;
		}
		if(newState.conversation_props[_oldConversation2]) {
			newState.conversation_props[_oldConversation2].isMerged = true;
		}
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
				<NavBar conversations={this.state.conversations} conversation_props={this.state.conversation_props} secret={this.toggleCleverBot} />
				<div id="view-container">
					{ React.cloneElement(this.props.children, {conversation_props: this.state.conversation_props, conversations: this.state.conversations, cleverMessage: this.state.cleverMessage}) }
				</div>
			</div>
		);
	}
});

export default MainView;
