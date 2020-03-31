prepublishOnly:
	npm run build
	# check uncommit changes
	[[ -z `git status --porcelain` ]]
	npm run test