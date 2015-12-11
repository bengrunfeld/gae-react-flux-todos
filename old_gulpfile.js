var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('src/js/main.js')
      .pipe(browserify({transform:'reactify'}))
      .pipe(concat('main.js'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('src/backend/templates'));
});

gulp.task('copy-css', function() {
    gulp.src('src/css/main.css')
      .pipe(gulp.dest('dist/css'));
});


gulp.task('default',['browserify', 'copy-html', 'copy-css']);