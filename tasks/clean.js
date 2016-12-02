'use strict';

const gulp = require('gulp');
const del = require('del');

module.exports = function(options) {
    
    return function() {
        return del(options.src);
    };
};