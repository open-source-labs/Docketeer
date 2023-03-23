// module.exports = {
//   autoprefixer: {},
// };
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };

// module.exports = () => {
//   return {
//     plugins: [
//       tailwindcss{},
//       // require('postcss-combine-media-query'),
//       // require('postcss-combine-duplicated-selectors'),
//       // require('postcss-prettify'),
//     ],
//   };
// };
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config.cjs';

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
};
