const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config/index.js')
const vueLoaderConfig = require('./vue-loader.js')
const isProduction = process.env.NODE_ENV === 'production'

let entries = {}
config.entries.forEach(function(entry) {
	entries[entry.entryName] = entry.entry
})

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

let webpackConfig = {
	context: path.resolve(__dirname, '../'),
	entry: entries,
	resolve: {
		extensions: ['.js', '.vue', '.json', '.scss', '.css'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, '../src/')
		}
	},
	module: {
		noParse: function(content) {
			return /jquery|Jquery/.test(content)
		},
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader'
				},
				include: [resolve('src')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: config.assetsSubDirectory + '/img/[name].[hash:9].[ext]',
							publicPath: !isProduction ? config.dev.assetsPublicPath : config.build.assetsPublicPath
						}
					}
				]
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: config.assetsSubDirectory + '/font/[name].[hash:9].[ext]',
							publicPath: !isProduction ? config.dev.assetsPublicPath : config.build.assetsPublicPath
						}
					}
				]
			}
		]
	},
	plugins: []
}

config.entries.forEach(function(entry) {
	let options = {
		filename: entry.filename,
		template: entry.template,
		chunks: ['manifest', 'vendor', entry.entryName],
		chunksSortMode: isProduction ? 'dependency' : 'auto'
	}

	let htmlMinify = {
		removeComments: true,
		collapseWhitespace: true,
		removeAttributeQuotes: true
	}

	if (isProduction) {
		options.minify = htmlMinify
	}

	webpackConfig.plugins.push(new HtmlWebpackPlugin(options))
})

module.exports = webpackConfig
