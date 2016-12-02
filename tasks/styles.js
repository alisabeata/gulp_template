'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const gcmq = require('gulp-group-css-media-queries');
const combine = require('stream-combiner2').obj;
const pkg = require('../package.json');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'; // if work on production type in terminal: NODE_ENV=production gulp <taskname> (dev for example)

module.exports = function(options) {
    
    return function() {
        return gulp.src(options.src)
                .pipe($.if(isDevelopment, $.sourcemaps.init()))
                .pipe($.stylus())
                .on('error', $.notify.onError(function (err) {
                    return {
                        title: 'Stylus',
                        message: err.message
                    };
                }))
                .pipe($.autoprefixer([
                    'Android >= ' + pkg.browsers.android,
                    'Chrome >= ' + pkg.browsers.chrome,
                    'Firefox >= ' + pkg.browsers.firefox,
                    'Explorer >= ' + pkg.browsers.ie,
                    'iOS >= ' + pkg.browsers.ios,
                    'Opera >= ' + pkg.browsers.opera,
                    'Safari >= ' + pkg.browsers.safari
                ]))
                .pipe(gcmq())
                .pipe($.csscomb())
                .pipe($.if(isDevelopment, $.sourcemaps.write()))
                .pipe($.if(!isDevelopment, combine( $.concat('common.css'), $.cssnano(), $.rev() )))
                .pipe(gulp.dest(options.dest))
                .pipe($.if(!isDevelopment, combine( $.rev.manifest('common.css.json'), gulp.dest('manifest') )));
    };
};

// $.if() == gulpIf()