import typescript from '@rollup/plugin-typescript';
import { version } from './package.json';

export default {
  input: 'src/stopwatch.ts',
  output: {
    file: 'index.js',
    name: 'Stopwatch2',
    format: 'umd',
    banner: `/* Stopwatch2 version ${version} */`,
  },
  treeshake: false,
  plugins: [typescript()],
};
