const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const path = require('path')
const utils = require('./utils')

let webpackConfig = {
	module: {
		rules: utils.styleLoaders({
			sourceMap: config.build.productionSourceMap,
			extract: true,
			usePostCSS: true
		})
	},
	output: {
		filename: config.assetsSubDirectory + '/js/[name].[chunkhash:9].js',
		path: config.assetsRoot,
		publicPath: config.build.assetsPublicPath
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': config.build.env
		}),
		new ExtractTextPlugin({
			filename: config.assetsSubDirectory + '/css/[name].[contenthash:9].css',
			allChunks: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: config.assetsSubDirectory + '/js/[name].[chunkhash:9].js',
			minChunks: function(module) {
				return (
					module.resource &&
					/\.js$/.test(module.resource) &&
					module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
				)
			}
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'app',
		// 	chunks: config.entries.map(function(item) {
		// 		return item.entryName
		// 	}),
		// 	minChunks: 3
		// }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			minChunks: Infinity
		}),

		new webpack.HashedModuleIdsPlugin()
	],
	devtool: config.build.productionSourceMap ? 'source-map' : false
}

webpackConfig.plugins.push(
	new webpack.optimize.UglifyJsPlugin({
		sourceMap: config.build.productionSourceMap
	})
)

if (config.build.bundleAnalyzerReport) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackMerge(webpackBaseConfig, webpackConfig)
