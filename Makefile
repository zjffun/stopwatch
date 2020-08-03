prepublishOnly:
	make build
	# check uncommit changes
	[[ -z `git status --porcelain` ]]
	make lint
	make tests

dev:
	# `-w` can't work now, but already fixed
	# see: https://github.com/rollup/plugins/pull/425
	# npx rollup -c -w
	npx chokidar "src/stopwatch.ts" -c "npm run build"

build:
	# rollup ts plugin can't generate d.ts now
	npx rollup -c
	make generateTypeDefinitions

tests:
	npx mocha
	npx karma start --single-run

lint:
	npx eslint **/*.js

generateTypeDefinitions:
	# https://github.com/rollup/plugins/issues/394
	tsc -d --emitDeclarationOnly
	mv ./src/stopwatch.d.ts ./index.d.ts