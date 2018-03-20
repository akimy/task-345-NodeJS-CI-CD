const env = process.env.NODE_ENV;
const plugins = [];

if (env === 'production') {
  /* eslint-disable-next-line */
  plugins.push(require('autoprefixer'));
}
module.exports = {
  plugins,
};
