prepublishOnly:
	npm run build
	# check uncommit changes
	[[ -z `git status --porcelain` ]]
	npm run test

generateTypeDefinitions:
	dts-gen -e "require(require('path').resolve('./index.js'))('sw')" -s