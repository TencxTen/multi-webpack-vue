const path = require('path')
const fs = require('fs')

let pageSrc = path.resolve(__dirname, '../src/pages')
let entriesConfig = []
let excludeDirs = []

let dirPages = fs.readdirSync(pageSrc).filter(function (dirName) {
  return excludeDirs.indexOf(dirName) === -1 && fs.statSync(pageSrc + '/' + dirName).isDirectory()
})

dirPages.forEach(function pageWalk(pageName) {
  let filemark = 'index'
  let pagePath = path.resolve(pageSrc, pageName)
  let files = fs.readdirSync(pagePath)
  let fileHTML = filemark + '.html'
  let fileJS = filemark + '.js'

  if (files.indexOf(fileHTML) === -1 || files.indexOf(fileJS) === -1) return

  let filename = pageName + '/' + fileHTML
  entriesConfig.push({
    entryName: pageName + '/' + filemark,
    entry: path.resolve(pageSrc, pageName, fileJS),
    filename: filename,
    template: path.resolve(pageSrc, filename)
  })

  let pageSubDirs = files.filter(function (file) {
    return fs.statSync(pagePath + '/' + file).isDirectory()
  }).map(function (dirName) {
    return pageName + '/' + dirName
  })

  if (pageSubDirs.length) {
    pageSubDirs.forEach(pageWalk)
  }
})

module.exports = {
  entries: entriesConfig,
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'assets',
  dev: {
    env: require('./dev.env.js'),
    assetsPublicPath: '/',
    cacheBusting: true,
    cssSourceMap: false
  },
  build: {
    env: require('./prod.env.js'),
    assetsPublicPath: '/',
    bundleAnalyzerReport: process.env.npm_config_report,
    productionSourceMap: false
  }
}
