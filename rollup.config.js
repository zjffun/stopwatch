const { version } = require('./package.json');

export default {
  input: 'src/stopwatch.js',
  output: {
    file: 'index.js',
    name: 'stopwatch2',
    format: 'umd',
    banner: `/* stopwatch2 version ${version} */`,
  },
  treeshake: false,
};
