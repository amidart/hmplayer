var gulp = require('gulp'); 

console.time("Loading plugins");

var jshint = require('gulp-jshint')
    , changed = require('gulp-changed')
    , del = require('del')
    , print = require('gulp-print')
    , concat = require('gulp-concat')
    , shell    = require('gulp-shell')
    ;

console.timeEnd("Loading plugins");

var paths = {
  scripts: ['js/**/*', 'vendor/**/*.js'],
  images: 'img/**/*',
  firefox: 'build/firefox/',
  firefoxData: 'build/firefox/data/',
  chrome: 'build/chrome/'
};

// ==========================================

function pipe(src, transforms, dest) {
  if (typeof transforms === 'string') {
    dest = transforms;
    transforms = null;
  }
  var stream = gulp.src(src);
  transforms && transforms.forEach(function(transform) {
    stream = stream.pipe(transform);
  })
  if (dest) stream = stream.pipe(gulp.dest(dest));
  return stream;
}

// ==========================================

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


// ========================================= Chrome

gulp.task('chrome', ['chrome-background', 'chrome-popup'], function() {
  pipe('vendor/chrome/manifest.json', paths.chrome);
  pipe('libs/**/*', paths.chrome + 'libs/');
  pipe('html/*', paths.chrome + 'html/');
  pipe('css/*', paths.chrome + 'css/');
});


gulp.task('chrome-background', function() {
  var scripts = ['js/main.js',
                 'vendor/chrome/browser.js',
                 'vendor/chrome/background-init.js',
                 'tests/background-test.js'];
  return gulp.src(scripts)
    .pipe(concat('background.js'))
    .pipe(gulp.dest(paths.chrome + 'js/'));
});

gulp.task('chrome-popup', function() {
  var scripts = ['vendor/chrome/browser-popup.js', 'js/popup.js'];
  return gulp.src(scripts)
    .pipe(concat('popup.js'))
    .pipe(gulp.dest(paths.chrome + 'js/'));
});

// ========================================= Firefox

gulp.task('firefox', ['firefox-main', 'firefox-data'], function() {
  pipe('vendor/firefox/package.json', paths.firefox);
  pipe('libs/**/*', paths.firefoxData + 'libs/');
  pipe('html/*', paths.firefoxData + 'html/');
  pipe('css/*', paths.firefoxData + 'css/');
});

gulp.task('firefox-main', function() {
    var scripts = ['js/main.js', 'vendor/firefox/browser.js'];
    return gulp.src(scripts)
      .pipe(concat('main.js'))
      .pipe(gulp.dest(paths.firefox + 'lib/'));
});

gulp.task('firefox-data', function() {

});

gulp.task('firefox-run', shell.task([
  'cd ./build/firefox && ../../tools/addon-sdk-1.16/bin/cfx run',
]));

// =========================================

// default gulp task
gulp.task('default', ['images', 'jshint', 'chrome'], function() {
});


gulp.task('watch', function() {
  gulp.watch(['js/**/*', 'vendor/**/*', 'html/*', 'css/*', 'tests/**/*'], ['chrome', 'firefox']);
  gulp.watch(paths.images, ['images']);
});
