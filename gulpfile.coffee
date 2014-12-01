gulp = require 'gulp'
$ = do require 'gulp-load-plugins'
browserSync = require 'browser-sync'
webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'


gulp.task 'default', ['serve']


gulp.task 'webpack', (cb) ->
  config = require './webpack.config'
  webpack config, (err, stats) ->
    throw new $.util.PluginError('webpack', err) if err
    $.util.log '[webpack]', stats.toString()
    cb()



gulp.task 'webpack-dev-server', (cb) ->
  compiler = webpack require './webpack.config'

  new WebpackDevServer compiler, {publicPath: './', hot: true}
  .listen 8080, 'localhost', (err) ->
    throw new $.util.PluginError('webpack-dev-server', err) if err
    $.util.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html")
