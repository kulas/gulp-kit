// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Variables
var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

// var src = {
//  styles: 'src/styles/*.scss',
//  scripts: 'src/scripts/*.js',
// };

// Compile, Minify, Autoprefix, and Sourcemap your Sass
gulp.task('sass', function() {
    return gulp
        .src('src/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'nested'}))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename('all.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'))
});

// Lint Task
gulp.task('lint', function() {
    return gulp
        .src('src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp
        .src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('src/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('src/styles/*.scss', ['sass']);
});

// To Do: Add clean up task


// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
