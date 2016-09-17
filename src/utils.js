export function getUser() {
	return fetch(`${config.api_root}/auth/getUserStatus`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	}).then((res) => {
		return res.json();
	});
}