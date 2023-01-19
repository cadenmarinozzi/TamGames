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

export { setCookie, getCookie, deleteCookie };
