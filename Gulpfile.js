var gulp       = require('gulp');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var react      = require('gulp-react');
var uglify     = require('gulp-uglify');
var browserify = require('browserify');
var reactify   = require('reactify');
var watchify   = require('watchify');
var source     = require('vinyl-source-stream');

var config = {
    sass: {
        source: [
            './src/Contacts/resources/scss/**/*.scss'
        ],
        compile: [
            './src/Contacts/resources/scss/main.scss'
        ],
        dest:   './public/css',
        target: 'global.css'
    },
    js: {
        source: [
            './src/Contacts/resources/js/**/*.js',
            './src/Contacts/resources/js/**/*.jsx'
        ],
        compile: [
            'application.js'
        ],
        dest:   './public/js'
    }
};

var handleError = function (e) {
    console.log('ERROR: ' + e.message);
};

gulp.task('sass', function () {
    gulp.src(config.sass.compile)
        .pipe(sass().on('error', handleError))
        .pipe(concat(config.sass.target))
        .pipe(gulp.dest(config.sass.dest));
});

gulp.task('sass:watch', ['sass'], function () {
    gulp.watch(config.sass.source, ['sass']);
});

gulp.task('js', function () {
    config.js.compile.forEach(function (e) {
        browserify('./src/Contacts/resources/js/' + e)
            .transform(reactify)
            .bundle()
                .on('error', handleError)
            .pipe(source(e))
            .pipe(gulp.dest(config.js.dest));
    });
});

gulp.task('js:watch', ['js'], function () {
    gulp.watch(config.js.source, ['js']);
});

gulp.task('watch', ['sass:watch', 'js:watch']);
gulp.task('default', ['sass', 'js']);
