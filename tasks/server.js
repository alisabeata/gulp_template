'use strict';

const browserSync = require('browser-sync').create();

module.exports = function(options) {
    
    return function() {
        
        browserSync.init({
            startPath: options.src,
            server: options.baseDir
        });

        browserSync.watch(options.watch).on('change', browserSync.reload);
    };
};