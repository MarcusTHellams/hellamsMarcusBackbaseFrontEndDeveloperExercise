var server = require('gulp-webserver');
var gulp = require('gulp');
var inject = require('gulp-inject');
var filesort = require('gulp-angular-filesort');

//The following is for just injecting my different angular app files in the correct order automatically so I don't run into any angular depdency errors which can be an issue in a app with alot of files. Probably didn't need it in an app this size but I used it anyway for peace of mind.

gulp.task('inject', function () {
    return gulp.src('src/index.html')
        .pipe(inject(
            gulp.src('src/js/app/**/*.js').pipe(filesort()), { relative: true }
        ))
        .pipe(gulp.dest('src/'));
});

//The following was for my benefit while building this app so I could have automatic reloading whenever I made changes.

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
