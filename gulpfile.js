var gulp = require('gulp');
var path = require('path');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');
var swPrecache = require('sw-precache');
var package = require('./package.json')

gulp.task('watch', function() {
    gulp.watch('less/**', ['build:style']);
});

gulp.task('build', ['build:style', 'build:sw-precache'])

gulp.task('build:style', function() {
    gulp
        .src(['less/*.less'])
        .pipe(less())
        .pipe(postcss([autoprefixer(['iOS >= 8', 'Android >= 4.1'])]))
        .pipe(
            cssnano({
                zindex: false,
                autoprefixer: false,
                discardComments: { removeAll: true }
            })
        )
        .pipe(gulp.dest('css'));
});

gulp.task('build:sw-precache', function(callback) {
    var rootDir = './';

    var config = {
        cacheId: package.version,
        handleFetch: true,
        verbose: true,
        runtimeCaching: [
            {
                urlPattern: /(.+)\.html(\?.*)?$/,
                handler: "networkFirst"
            },
            {
                urlPattern: /(.+)\.(jpg|png|gif|css|js)/,
                handler: "fastest"
            }
        ]
    };

    swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
});
