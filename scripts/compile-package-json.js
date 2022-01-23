const data = await Deno.readTextFile('package.json');
const json = JSON.parse(data);

const esmEntry = './src/index.js';

// Use latest git tag as version for package.json
const process = Deno.run({
  cmd: ["git", "describe", "--tags", "--abbrev=0"],
  stdout: "piped"
});

const output = await process.output();
const version = new TextDecoder().decode(output);

json.version = version ? version.split('v')[1].trim() : '0.0.1';
json.exports = {
  import: esmEntry,
  default: esmEntry,
};
json.browser = esmEntry;
json.module = esmEntry;

json.type = 'module';

json.types = './index.d.ts';

json.files = [
  'src/index.js',
  'src/index.map.js',
  'src/index.d.ts',
  'README.md'
];

if ('scripts' in json) {
  delete json.scripts;
}

await Deno.writeTextFile('pkg/package.json', JSON.stringify(json, null, 2));
