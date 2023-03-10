function setCookie(name, value) {
	document.cookie = name + '=' + value + ';path=/';
}

function getCookie(name) {
	const cookie = document.cookie
		.split('; ')
		.find((cookie) => cookie.startsWith(name + '='));

	return cookie ? cookie.split('=')[1] : null;
}

function deleteCookie(name) {
	document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function getCookies() {
	const cookies = document.cookie.split('; ');
	let dataCookies = {};

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=');
		let data = cookie[1];

		try {
			data = JSON.parse(data);
		} catch (e) {}

		dataCookies[cookie[0]] = data;
	}

	return dataCookies;
}

function setCookies(cookies) {
	for (let cookie in cookies) {
		setCookie(cookie, cookies[cookie]);
	}
}

export { setCookie, getCookie, deleteCookie, getCookies, setCookies };
