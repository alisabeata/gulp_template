'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'; // if work on production type in terminal: NODE_ENV=production gulp <taskname> (dev for example)

module.exports = function(options) {
    
    return function() {
        return gulp.src(options.src, {since: gulp.lastRun(options.taskName)})
            .pipe($.if(!isDevelopment, $.revReplace({
                manifest: gulp.src('manifest/common.css.json', { allowEmpty: true })
            }) ))
            .pipe(gulp.dest(options.dest));
    };
};