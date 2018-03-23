const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const inProduction = env === 'production';
console.log(inProduction ? 'prod' : 'dev');
const inDevelopment = env === 'development';

const config = {
  entry: './resources/assets/js/index.js',
  output: { path: path.resolve(__dirname, 'public'), filename: 'bundle.js' },
  resolve: { extensions: ['.js'] },
  watch: inDevelopment,
  module: {
    loaders: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { minimize: inProduction } },
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
    }),
  ],
};

if (inProduction) {
  config.plugins.push(new UglifyJsPlugin());
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));
}

module.exports = config;
