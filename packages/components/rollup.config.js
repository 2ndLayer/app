import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';

export default {
  input: 'src/index.tsx',
  output: {
    dir: 'dist',
    format: 'esm',
    entryFileNames: '[name].js',
    assetFileNames: '[name].[ext]',
  },
  plugins: [
    typescript(),
    postcss({
      extract: true,
      plugins: [
        postcssImport(),
      ],
      minimize: true,
      sourceMap: true,
      autoModules: true,
      exclude: 'node_modules/**/*',
      extensions: ['.css'],
    }),
  ],
  external: [
    'react',
    'react-dom',
  ],
};