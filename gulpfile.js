'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    newer = require('gulp-newer'),
    browserSync = require("browser-sync"),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss= require('gulp-cleanl-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin'),
    notify = require('gulp-notify');

//configurar las tareas
//sass
gulp.task('sass', function () {
    gulp.src('./css/*.scss ') //Ruta de la carpeta sass apuntando a los archivos `.scss`
        .pipe(sass().on('error', sass.logError)) //Compila los archivos `.scss` y muestra posibles errores
        .pipe(gulp.dest('./css')) //Carpeta donde se guardaran los archivos `.css` compilado
        .pipe(notify("Tarea sass terminada!")); //Mensaje gracias al plugin `gulp-notify`
});
//watch
gulp.task('sass:watch', function () {
    gulp.watch('./css/*scss', ['sass']);
});
//browser-sync
gulp.task('browserSync', function () {
    var files = ['*.html', './css/*.css', './img/*.{png, jpg, gif,}', './js/*.js']
    browserSync.init(files, {
        server: {
            baseDir: "./"
        }
    });
});
//del
gulp.task('clean',function () {
  return del(['dist']);
});
//copy font
gulp.task('copyfonts', function () {
    gulp.start('./node_modules/open-ionic/font/fonts/*.{ttf,woff,eof,svg,eot,otf}*')
    .pipe(gulp.dest('./dist/fonts'));
});

//imagemin
gulp.task('imagemin', function () {
    return gulp.src('./img/*.{png, jpg, gif,}')
    .pipe(imagemin({optimizationLevel: 3, preogressive: true, interlaced: true}))
    .pipe(gulp.dest('dist/images'));
});
//usemin
gulp.task('usemint', function () {
    return gulp.src('./*.html')
    .pipe(flatmap(function (stream, file) {
        return stream
        .pipe(usemin({
            css: [rev()],
            html:[function () { return htmlmin({collapseWhitespace})}],
            js:[uglify(), rev()],
            inLinejs:[uglify()],
            inLinecss:[cleanCss(), 'contact']
        }));
    }))
    .pipe(pglup.dest('./dist'))
});
//build
gulp.task('default', ['browser-sync'], function () {
    gulp.start('sass:watch');
});
//default
//corre la tarea browser-sync y ejecuta el sass
gulp.task('build', ['clean'], function () {
    gulp.start('copyfonts','imagemin', 'usemin');
});
/*
//Watch task
gulp.task("watch", ["browserSync"], function() {
    gulp.watch('sass/*.scss', ['sass']);
    gulp.watch(["./*.html", "css/*.css", "js/*.js"]).on("change", browserSync.reload);
    });*/
gulp.task('hola', function () {
    console.log('Hola!');
});