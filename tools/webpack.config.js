/* eslint-disable global-require, no-confusing-arrow, max-len */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const isDebug = (() => {
  if (global.DEBUG === false && process.env.NODE_ENV === 'production') {
    return false;
  } else {
    return !process.argv.includes('--release');
  }
})();

const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');


// Webpack configuration (main.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  // The base directory for resolving the entry option
  context: path.resolve(__dirname, '../src'),

  // The entry point for the bundle
  entry: [
    /* Material Design Lite (https://getmdl.io) */
    /* The main entry point of your JavaScript application */
    './main.js',
  ],


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

  resolve: {
    alias: {
      config: path.join(__dirname, '../config', process.env.NODE_ENV),
      utils: path.join(__dirname, '../tools', 'utils'),
    },
  },
};


getConfig = () => {
  let _config = null;
  switch(process.env.NODE_ENV){
    case 'development':
      _config = require('./webpack.dev.config'); break;
    case 'qa':
      _config = require('./webpack.qa.config'); break;
    case 'production':
      _config = require('./webpack.prod.config') ; break;
  }
  return Object.assign(config, _config);
};

module.exports = getConfig();
