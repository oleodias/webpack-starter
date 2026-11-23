const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// autoprefixer: acrescenta os prefixos (-webkit-, -ms-) que os navegadores
// do "browserslist" (package.json) precisam. cssnano: minifica o CSS.
module.exports = {
  plugins: [autoprefixer, cssnano({ preset: 'default' })],
};
