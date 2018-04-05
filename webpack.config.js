let rimraf = require('rimraf')

let webpackConfig =
	process.env.NODE_ENV === 'development'
		? require('./build/webpack.dev.js')
		: require('./build/webpack.prod.js')

if (process.env.NODE_ENV === 'production') {
	rimraf('./dist', err => {
		if (err) throw err
	})
}

module.exports = webpackConfig
