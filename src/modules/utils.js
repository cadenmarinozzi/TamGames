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

export { formatFirebasePath, lerpColor };
