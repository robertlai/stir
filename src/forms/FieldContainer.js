import React from 'react';

const FieldContainer = React.createClass({
	render() {
		const { field, fieldProps } = this.props;

		return (
			<div className='field'>
				{ React.createElement(field, fieldProps) }
			</div>
		);
	}
});

export default FieldContainer;
