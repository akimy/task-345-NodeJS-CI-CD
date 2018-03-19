const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const env = process.env.NODE_ENV;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const inProduction = env === 'production';
const inDevelopment = env === 'development';

const config = {
  entry: './public/src/javascripts/index.js',
  output: { path: `${__dirname}/public/build`, filename: 'bundle.js' },
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
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          publicPath: '',
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
  config.plugins.push(new UglifyJsPlugin({
    sourceMap: true,
  }));
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }));
} else {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }));
}

module.exports = config;
