clean_pkg:
	rm -rf pkg/

generate_types:
	npx --yes tsc --project jsconfig.json --declaration --emitDeclarationOnly --declarationDir pkg/src

build: clean_pkg generate_types
	npx esbuild src/index.js --bundle --minify --sourcemap --format=esm --platform=browser --target=es2020 --outfile=pkg/src/index.js
	deno run --allow-read --allow-run --allow-write scripts/compile-package-json.js
	cp README.md pkg/README.md
	npx --yes @skypack/package-check --cwd ./pkg

release:
	npm version patch
	make
	npm publish ./pkg
	git push --follow-tags
