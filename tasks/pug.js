'use strict';

const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const combine = require('stream-combiner2').obj;

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development'; // if work on production type in terminal: NODE_ENV=production gulp <taskname> (dev for example)

module.exports = function(options) {
    
    return function() {
        return gulp.src(options.src)
            .pipe($.pug())
            .on('error', $.notify.onError(function (err) {
                return {
                    title: 'Pug',
                    message: err.message
                };
            }))
            .pipe($.htmlPrettify({
                indent_char: ' ',
                indent_size: 4
            }))
            .pipe($.if(!isDevelopment, combine(
                $.revReplace({
                    manifest: gulp.src('manifest/common.css.json', { allowEmpty: true })
                }), $.revReplace({
                    manifest: gulp.src('manifest/common.min.js.json', { allowEmpty: true })
                }))
            ))
            .pipe(gulp.dest(options.dest));
    };
};