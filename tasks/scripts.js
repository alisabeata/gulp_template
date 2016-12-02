'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'; // if work on production type in terminal: NODE_ENV=production gulp <taskname> (dev for example)


module.exports = function(options) {
    
    return function() {
        return gulp.src(options.src)
            .pipe($.if(!isDevelopment, combine( $.concat('common.min.js'), $.uglify(), $.rev() )))
            .pipe(gulp.dest(options.dest))
            .pipe($.if(!isDevelopment, combine( $.rev.manifest('common.min.js.json'), gulp.dest('manifest') )));
    };
};