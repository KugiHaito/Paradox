var gulp = require('gulp');
var sass = require('gulp-sass');
var srcmaps = require('gulp-sourcemaps');
var plumber = require("gulp-plumber");
var concat = require("gulp-concat");
var rename = require("gulp-rename");

// gulp config
const config = {
    path: {
        src: './src/**/*.sass',
        dist: './dist/css',
        js: {
            src: './src/js/**/*.js',
            dist: './dist/js',
            distName: 'paradox.js'
        },
        root: '.',
    },
    task: {
        default: 'sass:default',
        minified: 'sass:minified',
        script: 'js:minified'
    }
}

// default (expanded)
gulp.task(config.task.default, () => {
  return gulp.src(config.path.src)
      .pipe(srcmaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
      .pipe(srcmaps.write(config.path.root))
      .pipe(gulp.dest(config.path.dist))
});

// minified
gulp.task(config.task.minified, () => {
    return gulp.src(config.path.src)
        .pipe(srcmaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(srcmaps.write(config.path.root))
        .pipe(gulp.dest(config.path.dist))
});

// script
gulp.task(config.task.script, () => {
    return gulp.src(config.path.js.src)
        .pipe(plumber())
        .pipe(concat(config.path.js.distName))
        // .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(config.path.js.dist))
})

// watch
gulp.task('watch', () => {
    gulp.watch(config.path.src, gulp.series(config.task.default, config.task.minified))
});
