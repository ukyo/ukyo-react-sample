gulp = require 'gulp'
runSequence = require 'run-sequence'
$ = do require 'gulp-load-plugins'
webpack = require 'webpack'
browserSync = require 'browser-sync'

gulp.task 'default', ['serve']

gulp.task 'style', ->
  gulp.src('./public/styles/style.scss')
  .pipe($.sass())
  .pipe(gulp.dest('./public/styles/'))
  # .pipe(browserSync.reload({stream: true}))

gulp.task 'build', ->
  $.webpack require './webpack.config'
  .pipe gulp.dest './public/'

gulp.task 'serve', (cb) ->
  runSequence 'style',  ->
    nodemon = $.nodemon({script: './bin/www', ext: 'js jsx', ignore: ['public/**']})
    nodemon.on 'start', ->
      setTimeout ->
        browserSync
          files: [
            "public/styles/style.css"
            "public/src/**/*.jsx"
          ]
          watchOptions:
            debounceDelay: 5000
          port: 3001
          proxy: "localhost:3000"
      , 3000
  gulp.watch './public/styles/**/*.scss', ['style']