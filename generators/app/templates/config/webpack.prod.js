var commonConfig = require('./webpack.common');
var webpackMerge = require('webpack-merge');
var path = require('path');

var config = webpackMerge(commonConfig, {
  entry: './src/<%= componentName %>.js',

  output: {
    path: path.join(__dirname, '../dist'),
    filename: '<%= appname %>.js',
    libraryTarget: 'commonjs'
  },

  target: 'node',

  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'classnames': 'classnames'
  }
});

module.exports = config;
