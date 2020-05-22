prepublishOnly:
	make build
	# check uncommit changes
	[[ -z `git status --porcelain` ]]
	make lint
	make tests

dev:
	npx rollup -c -m inline -w

build:
	npx rollup -c

tests:
	npx mocha
	npx karma start --single-run

lint:
	npx eslint **/*.js

generateTypeDefinitions:
	dts-gen -e "require(require('path').resolve('./index.js'))" -s