import babel from 'rollup-plugin-babel'

export default {
  input: './src/index.js',
  output: {
    format: 'umd',
    name: 'MVue', // 暴露全局 Vue 变量
    file: 'dist/mvue.js',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    })
  ]
}