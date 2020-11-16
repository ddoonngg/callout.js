import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import alias from '@rollup/plugin-alias';
import path from 'path';
import replace from '@rollup/plugin-replace';
const projectRootDir = path.resolve(__dirname);

const Global = `var process = {
  env: {
    NODE_ENV: 'production'
  }
}`;

export default {
  input: 'src/example.tsx',
  output: {
    file: 'temp/bundle.cjs.js',
    format: 'cjs',
    name: 'bundbleName',
    sourcemap: true
    // banner: Global,
  },
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(projectRootDir, 'src')
        }
      ]
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.VUE_ENV': JSON.stringify('browser')
    }),
    typescript(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    postcss(),
    livereload(),
    serve({
      open: false,
      port: 8888,
      contentBase: ''
    })
  ],
  external: ['lodash'],
  global: {
    jquery: '$'
  }
};
