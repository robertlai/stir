import React from 'react';
import NavBar from 'components/NavBar';

const MainView = React.createClass({
	render() {
		return (
			<div id="main-container">
				<NavBar />
				<div id="view-container">
					{ this.props.children }
				</div>
			</div>
		);
	}
});

export default MainView;