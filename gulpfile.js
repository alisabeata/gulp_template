'use strict';

const gulp = require('gulp');

function lazeRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
        let task = require(path).call(this, options);
        
        return task(callback);
    });
}

lazeRequireTask('styles', './tasks/styles', {
    src: ['assets/frontend/stylus/pages/base.styl', 'assets/frontend/stylus/pages/*.styl'],
    dest: 'build/frontend/css'
});

lazeRequireTask('pug', './tasks/pug', {
    src: 'assets/frontend/templates/pages/*.pug',
    dest: 'build/frontend',
    taskName: 'pug'
});

lazeRequireTask('scripts', './tasks/scripts', {
    src: 'assets/frontend/js/**/*.js',
    dest: 'build/frontend/js',
    taskName: 'scripts'
});

lazeRequireTask('clean', './tasks/clean', {
    src: ['build', 'manifest']
});

lazeRequireTask('copy:files', './tasks/copy', {
    src: 'assets/frontend/copy/**',
    dest: 'build/frontend',
    taskName: 'copy:files'
});

lazeRequireTask('copy:img', './tasks/copy', {
    src: 'assets/frontend/img/**/**.*',
    dest: 'build/frontend/img',
    taskName: 'copy:img'
});

lazeRequireTask('server', './tasks/server', {
    src: 'build/frontend/',
    baseDir: './',
    watch: 'build/frontend/**/*.*'
});

lazeRequireTask('eslint', './tasks/eslint', {
    src: 'assets/frontend/js/**/*.js'
});


gulp.task('watch', function() {
    gulp.watch('assets/frontend/stylus/**/*.*', gulp.series('styles'));
    gulp.watch('assets/frontend/templates/**/*.pug', gulp.series('pug'));
    gulp.watch('assets/frontend/js/**/*.js', gulp.series('scripts'));
    gulp.watch('assets/frontend/copy/**/*.*', gulp.series('copy:files'));
    gulp.watch('assets/frontend/img/**/*.*', gulp.series('copy:img'));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'scripts'),
    'pug',
    gulp.parallel('copy:files', 'copy:img')
));

gulp.task('dev', gulp.series(
    'build', 
    gulp.parallel('watch', 'server')
));

gulp.task('default', gulp.series(
    'build', 
    'eslint',
    gulp.parallel('watch', 'server')
));

    