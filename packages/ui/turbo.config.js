// const { createCompiler } = require("@turbo/turbo");

// module.exports = createCompiler({
//   input: "src/index.tsx",
//   output: {
//     dir: "dist",
//     format: "cjs",
//     sourcemap: true,
//   },
//   plugins: [
//     require("turbo-plugin-terser")(),
//     require("turbo-plugin-postcss")({
//       extract: true,
//       minimize: true,
//       modules: true,
//       sourceMap: true,
//       plugins: [require("tailwindcss")],
//     }),
//     require("turbo-plugin-copy")({
//       patterns: [{ from: "public", to: "public" }],
//     }),
//   ],
//   external: ["react", "react-dom"],
// });
