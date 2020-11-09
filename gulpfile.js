var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var sourcemaps = require('gulp-sourcemaps');

var path = {
    'sass': {
        'src':'./src/**/*.scss',
        'dist':'./dist/css'
    }
}

gulp.task('sass', function() {
    return gulp.src(path['sass']['src'])
        .pipe(sourcemaps.init())
        // output non-minified CSS file
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        // output the minified version
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path['sass']['dist']))
});

gulp.task('watch', function() {
    gulp.watch(path['sass']['src'], gulp.series('sass'))
});