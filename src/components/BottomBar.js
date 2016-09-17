import React from 'react';

const BottomBar = React.createClass({
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
							// this.addNewMessage();
						}
					}}
					onBlur={ () => {
						// setTimeout(() => { this.refs.inputBox.focus(); }, 20);
					}}
				/>
				<button id='send-message-button' onClick={() => {}}>Send</button>
			</div>
		)
	}
});

export default BottomBar;
