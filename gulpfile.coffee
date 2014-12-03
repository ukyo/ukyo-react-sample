gulp = require 'gulp'
runSequence = require 'run-sequence'
$ = do require 'gulp-load-plugins'

gulp.task 'default', ['serve']

gulp.task 'build', ->
  $.webpack require './webpack.config'
  .pipe gulp.dest './public/'

gulp.task 'serve', (cb) ->
  runSequence 'build', ->
    $.livereload.listen()
    $.nodemon({script: './bin/www.coffee'}).on 'restart', ->
      setTimeout ->
        $.livereload.changed()
      , 2000
  gulp.watch './client/**/*.js', ->
    gulp.run 'build'
