const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const config = require('../config')
const utils = require('./utils')

let webpackConfig = {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  output: {
    filename: config.assetsSubDirectory + '/js/[name].js',
    path: config.assetsRoot,
    publicPath: config.dev.assetsPublicPath
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new ExtractTextPlugin({
			filename: config.assetsSubDirectory + '/css/[name].css',
			allChunks: true
		}),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsPlugin()
  ],
  devServer: {
    clientLogLevel: 'none',
    overlay: true,
    openPage: 'index',
    quiet: true
  },
  devtool: 'eval-source-map'
}

module.exports = webpackMerge(webpackBaseConfig, webpackConfig)
