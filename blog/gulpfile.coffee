gulp = require 'gulp'
runSequence = require 'run-sequence'
$ = do require 'gulp-load-plugins'

gulp.task 'default', ['serve']

gulp.task 'style', ->
  gulp.src('./public/styles/style.scss')
  .pipe($.sass())
  .pipe(gulp.dest('./public/styles/'))

gulp.task 'build', ->
  $.webpack require './webpack.config'
  .pipe gulp.dest './public/'

gulp.task 'serve', (cb) ->
  runSequence 'style', 'build', ->
    $.livereload.listen()
    $.nodemon({script: './bin/www'}).on 'restart', ->
      setTimeout ->
        $.livereload.changed()
      , 2000
  gulp.watch './public/src/**/*.js', ->
    gulp.run 'build'
