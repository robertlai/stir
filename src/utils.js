import 'whatwg-fetch';

export function cleverBot(message) {
	return fetch(`${config.api_root}/api/bot/reply`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		body: JSON.stringify({
			message: message
		})
	});
}

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

