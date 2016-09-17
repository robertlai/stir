import React from 'react';
import { Link, browserHistory } from 'react-router';
import 'whatwg-fetch';

import Form from 'forms/Form';
import RegisterFormSchema from 'forms/schemas/RegisterFormSchema';

const RegisterView = React.createClass({
	getInitialState() {
		return {
			validationEnabled: false
		};
	},
	handleSubmit(e) {
		e.preventDefault();

		const { form } = this.refs;

		if(form.validate()) {
			const { username, password } = form.getValue();

			fetch(`${config.api_root}/auth/register`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					username: username,
					password: password
				})
			}).then((res) => {
				if(res.status == 200) {
					browserHistory.push('/');
				}
			});
		}

		this.setState({
			validationEnabled: true,
		});
	},
	render() {
		return (
			<div id='auth_container'>
				<form id='auth_form'>
					<h1>Register</h1>
					<Form
						ref='form'
						schema={RegisterFormSchema}
						validationEnabled={this.state.validationEnabled}
					/>
					<button id="submit-button" onClick={this.handleSubmit}>Submit</button>
				<Link to='/login'>Login</Link>
				</form>
			</div>
		);
	}
});

export default RegisterView;
