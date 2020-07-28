prepublishOnly:
	make build
	# check uncommit changes
	[[ -z `git status --porcelain` ]]
	make lint
	make tests

dev:
	# can't work now, but already fixed
	# see: https://github.com/rollup/plugins/pull/425
	npx rollup -c -w

build:
	npx rollup -c

tests:
	npx mocha
	npx karma start --single-run

lint:
	npx eslint **/*.js

generateTypeDefinitions:
	dts-gen -e "require(require('path').resolve('./index.js'))" -s