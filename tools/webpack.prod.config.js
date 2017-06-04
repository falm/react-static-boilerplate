/* eslint-disable global-require, no-confusing-arrow, max-len */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('../package.json');

const isDebug = false;

const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: false,
  presets: pkg.babel.presets.map(x => x === 'latest' ? ['latest', { es2015: { modules: false } }] : x),
});

// Webpack configuration (main.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  // The base directory for resolving the entry option
  context: path.resolve(__dirname, '../src'),

  // The entry point for the bundle
  entry: [
    /* The main entry point of your JavaScript application */
    './main.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, '../public/dist'),
    publicPath: '/dist/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js',
    sourcePrefix: '  ',
  },

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      __DEV__: isDebug,
    }),
    // Emit a JSON file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: isDebug,
      minimize: !isDebug,
    }),
  ],

  // Options affecting the normal modules
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src'),
          path.resolve(__dirname, '../components'),
          path.resolve(__dirname, '../config'),
        ],
        loader: 'babel-loader',
        options: babelConfig,
      },
      {
        test: /\.css/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
              importLoaders: true,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
              // CSS Nano http://cssnano.co/options/
              minimize: !isDebug,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: './tools/postcss.config.js',
            },
          },
        ],
      },
      {
        test: /\.json$/,
        exclude: [
          path.resolve(__dirname, '../src/routes.json'),
        ],
        loader: 'json-loader',
      },
      {
        test: /\.json$/,
        include: [
          path.resolve(__dirname, '../src/routes.json'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
          {
            loader: path.resolve(__dirname, './routes-loader.js'),
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },

  resolve: {
    alias: {
      config: path.join(__dirname, '../config', process.env.NODE_ENV),
      utils: path.join(__dirname, '../tools', 'utils'),
    },
  },
};

// Optimize the bundle in release (production) mode
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  compress: {
    warnings: isVerbose,
  },
}));
config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());


module.exports = config;
