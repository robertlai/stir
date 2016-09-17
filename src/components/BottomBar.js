import React from 'react';
import 'whatwg-fetch';

const BottomBar = React.createClass({
	addNewMessage() {
		let text = this.refs.inputBox.value.trim();
		if(text != '') {
			fetch(`${config.api_root}/api/messages/new`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					_conversation: this.props.conversation_id,
					messageContent: text
				})
			}).then((res) => {
				if(res.status == 201) {
					this.refs.inputBox.value = '';
					this.props.onSubmit();
				}
			});
		}
	},
	render() {
		return (
			<div id='bottom-bar'>
				<input
					id='message-text-box'
					type='text'
					ref='inputBox'
					autoComplete='off'
					onKeyPress={ (e) => {
						if(e.key == 'Enter') {
							this.addNewMessage();
						}
					}}
					onBlur={ () => {
						setTimeout(() => { this.refs.inputBox.focus(); }, 20);
					}}
				/>
				<button id='send-message-button' onClick={this.addNewMessage}>Send</button>
			</div>
		)
	}
});

export default BottomBar;
