let webpackMerge = require('webpack-merge')
let prodEnv = require('./prod.env.js')

module.exports = webpackMerge(prodEnv, {
  NODE_ENV: '"development"'
})
