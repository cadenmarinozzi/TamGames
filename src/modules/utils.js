function formatFirebasePath(path) {
	return path.replaceAll('.', ',');
}

// lerp('rgb('255, 255, 255')', 'rgb('0, 0, 0')', 0.5) // 'rgb('127, 127, 127')'
function lerpColor(a, b, amount) {
	let ra = parseInt(a.substring(4, a.indexOf(',')));
	let ga = parseInt(a.substring(a.indexOf(',') + 1, a.lastIndexOf(',')));
	let ba = parseInt(a.substring(a.lastIndexOf(',') + 1, a.indexOf(')')));

	let rb = parseInt(b.substring(4, b.indexOf(',')));
	let gb = parseInt(b.substring(b.indexOf(',') + 1, b.lastIndexOf(',')));
	let bb = parseInt(b.substring(b.lastIndexOf(',') + 1, b.indexOf(')')));

	let nr = Math.round(ra + (rb - ra) * amount);
	let ng = Math.round(ga + (gb - ga) * amount);
	let nb = Math.round(ba + (bb - ba) * amount);

	return 'rgb(' + nr + ',' + ng + ',' + nb + ')';
}

function scrollToComponent(ref) {
	window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
}

function calculatePasswordStrength(password) {
	if (password.length < 8) {
		return 'weak';
	}

	if (password.length < 12) {
		return 'good';
	}

	return 'strong';
}

function downloadImage(base64) {
	const link = document.createElement('a');
	link.href = base64;
	link.download = 'image.png';

	document.body.appendChild(link);

	link.click();

	document.body.removeChild(link);
}

function verifyEmailFormat(email) {
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

	return emailRegex.test(email);
}

function formatFirebaseEmail(email) {
	return email.replaceAll('.', ',');
}

export {
	formatFirebasePath,
	lerpColor,
	scrollToComponent,
	calculatePasswordStrength,
	verifyEmailFormat,
	formatFirebaseEmail,
	downloadImage,
};
