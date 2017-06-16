var server = require('gulp-webserver');
var gulp = require('gulp');
var inject = require('gulp-inject');
var filesort = require('gulp-angular-filesort');

gulp.task('inject', function () {
    return gulp.src('src/index.html')
        .pipe(inject(
            gulp.src('src/js/app/**/*.js').pipe(filesort()), { relative: true }
        ))
        .pipe(gulp.dest('src/'));
});

gulp.task('server', ['watch'], function () {
    gulp.src('src')
        .pipe(server({
            livereload: true,
            fallback: 'index.html'
        }));

});

gulp.task('watch', function () {
    gulp.watch(['src/js/app/**/*.js', 'src/index.html', 'src/templates/**/*.html'], ['inject']);
});

gulp.task('dev:server', ['inject', 'server']);
