# Web Component Template

[![Node.js CI](https://github.com/enjikaka/web-component/actions/workflows/main.yml/badge.svg)](https://github.com/enjikaka/web-component/actions/workflows/main.yml)

A web component template project.

Includes:
- Type checking via JSDoc
- Type declarations (.d.ts) from JSDoc in the built project
- Esbuild to build the project
- Custom script to copy and tweak package.json into pkg/ folder with version from git tags
- Verify built pkg with @skypack/package-check

## Usage

Make the component in src/index.js

Run `make build` to build the project.

Project is build into the `pkg/` dir

`npm publish ./pkg`
