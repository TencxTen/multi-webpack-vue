const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
const config = require('../config')
const path = require('path')
const utils = require('./utils')
const os = require('os')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')

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
		new webpack.HashedModuleIdsPlugin(),
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
		new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),

		new WebpackChunkHash()
	],
	devtool: config.build.productionSourceMap ? 'source-map' : false
}

webpackConfig.plugins.push(
	new UglifyJsParallelPlugin({
		workers: os.cpus().length,
		sourceMap: config.build.productionSourceMap,
		mangle: true,
		compressor: {
			warnings: false,
			drop_console: true,
			drop_debugger: true
		 }
	})
)

if (config.build.bundleAnalyzerReport) {
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackMerge(webpackBaseConfig, webpackConfig)
