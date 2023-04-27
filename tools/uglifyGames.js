const glob = require('glob');
const fs = require('fs');
const uglifyjs = require('uglify-js');

const gamesDir = './public/Games';
const newGamesDir = './public/newGames';
const cacheFile = './uglifyGamesCache.json';

let cache = [];

async function minifyFile(file) {
	console.log('Writing FILE: ', file);

	const fileData = await fs.promises.readFile(file, 'utf8');

	// If the file is too big, skip it
	if (fileData.length > 2000000) {
		console.log('Skipping FILE: ', file);
		cache.push(file);

		return;
	}

	const uglified = uglifyjs.minify(fileData);
	const code = uglified.code;

	if (!code) {
		console.log('Skipping FILE: ', file);
		cache.push(file);

		return;
	}

	let newFilePath = file.replace(gamesDir, newGamesDir);

	// Write the file
	fs.writeFile(newFilePath, code, (err) => {
		if (err) throw err;

		console.log('Wrote FILE: ', newFilePath);

		cache.push(file);

		fs.writeFile(cacheFile, JSON.stringify(cache), (err) => {
			if (err) throw err;
		});
	});
}

const files = glob.sync(gamesDir + '/**/*');

if (fs.existsSync(cacheFile)) {
	cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
}

(async () => {
	for (let file of files) {
		if (!file.endsWith('.js')) continue;
		if (cache.includes(file)) continue;

		await minifyFile(file);
	}

	console.log('Done!');

	let originalFolderSize = 0;

	for (let file of files) {
		originalFolderSize += fs.statSync(file).size;
	}

	let newFolderSize = 0;

	for (let file of files) {
		newFolderSize += fs.statSync(file.replace(gamesDir, newGamesDir)).size;
	}

	console.log('Original folder size: ', originalFolderSize);
	console.log('New folder size: ', newFolderSize);
	console.log('Saved: ', originalFolderSize - newFolderSize);
})();
