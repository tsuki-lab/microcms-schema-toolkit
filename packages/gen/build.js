/* eslint-env node */

const { build } = require('esbuild');
const packageJson = require('./package.json');

const dependencies = Object.hasOwnProperty.call(packageJson, 'dependencies')
  ? packageJson.dependencies
  : {};
const entryFile = 'src/index.ts';

/** @type {import('esbuild').BuildOptions} */
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  external: Object.keys(dependencies),
  logLevel: 'info',
  minify: true,
  sourcemap: false,
  treeShaking: true,
};

build({
  ...shared,
  format: 'esm',
  outfile: './dist/index.esm.js',
  target: ['ES6'],
});

build({
  ...shared,
  format: 'cjs',
  outfile: './dist/index.cjs.js',
  target: ['ES6'],
});
