const RegisterFormSchema = {
	username: {
		field: 'text',
		type: 'text',
		placeholder: 'Username',
		defaultValue: '',
		required: true
		// username: true
	},
	password: {
		field: 'text',
		type: 'password',
		placeholder: 'Password',
		defaultValue: '',
		required: true
		// minlength: 5,
	},
	password_confirmation: {
		field: 'text',
		type: 'password',
		placeholder: 'Confirm Password',
		defaultValue: '',
		required: true
	}
};

export default RegisterFormSchema;
