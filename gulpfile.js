var gulp = require('gulp'); 

console.time("Loading plugins");

var jshint = require('gulp-jshint')
    , changed = require('gulp-changed')
    , del = require('del')
    , print = require('gulp-print')

console.timeEnd("Loading plugins");

var paths = {
  scripts: ['js/**/*'],
  images: 'img/**/*',
  firefox: 'build/firefox/',
  firefoxData: 'build/firefox/data/',
  chrome: 'build/chrome/'
};


gulp.task('clean', function(cb) {
  del(['build'], cb);
});


gulp.task('jshint', function() {
  gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('images', function() {
  var imagemin = require('gulp-imagemin'),
      chromeDst = paths.chrome + 'img';
  gulp.src(paths.images)
    .pipe(changed(chromeDst))
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(gulp.dest(chromeDst))
    .pipe(gulp.dest(paths.firefoxData + 'img'));
});


gulp.task('scripts', function() {

});


// default gulp task
gulp.task('default', ['images', 'jshint', 'scripts'], function() {
});


gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});