var themename = "gulp-4"

var gulp = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    reload = browserSync.reload,
    sass = require("gulp-sass"),
    cleanCSS = require("gulp-clean-css"),
    sourcemaps = require("gulp-sourcemaps"),
    concat = require("gulp-concat"),
    imagemin = require("gulp-imagemin"),
    change = require("gulp-changed"),
    uglify = require("gulp-uglify"),
    lineec = require("gulp-line-ending-corrector"),
    stylus = require("gulp-stylus")

let root = "./", //+ themename + "/",
    scss = root + "sass/",
    styl = root + "styl/",
    js = root + "js/",
    jsdist = root + "dist/js"

let sassWatchFiles = scss + "**/*.scss"
let styleWatchFiles = styl + "**/*.styl"

let jsSRC = [
    js + "na.js",
    js + "na.js"
]

var cssSRC = [
    /*root + "src/css/na.css",
    root + "src/css/na.css",
    root + "src/css/na.css",*/
    root + "default.css"
]

let imgSRC = root + "src/images/*",
    imgDEST = root + "dist/images"

function SASScss() {
    return gulp.src([scss + "default.scss"])
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(sass({
        outputStyle: "expanded"
    }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest(root))
}

function STYLcss() {
    return gulp.src([styl + "default.styl"])
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(stylus())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(sourcemaps.write())
    .pipe(lineec())
    .pipe(gulp.dest(root))
}

function SASSconcatCSS() {
    return gulp.src(cssSRC)
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat("default.min.css"))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("./maps/"))
    .pipe(lineec())
    .pipe(gulp.dest(scss))
}

function STYLconcatCSS() {
    return gulp.src(cssSRC)
    .pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
    .pipe(concat("default.min.css"))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("./maps/"))
    .pipe(lineec())
    .pipe(gulp.dest(styl))
}

function javascript() {
    return gulp.src(jsSRC)
    .pipe(concat("default.js"))
    .pipe(uglify())
    .pipe(lineec())
    .pipe(gulp.dest(jsdist))
}

function imgmin() {
    return gulp.src(imgSRC)
    .pipe(changed(imgDEST))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(imgDEST))
}

function watch() {
    /*browserSync.init({
        open: "external",
        proxy: "http://localhost",
        port: 8080
    })*/
    gulp.watch(sassWatchFiles, gulp.series([SASScss, SASSconcatCSS]))
    gulp.watch(styleWatchFiles, gulp.series([STYLcss, STYLconcatCSS]))
    /*gulp.watch(jsSRC, javascript)
    gulp.watch(imgSRC, imgmin)*/
}

exports.SASScss = SASScss
exports.STYLcss = STYLcss
exports.SASSconcatCSS = SASSconcatCSS
exports.STYLconcatCSS = STYLconcatCSS

let build = gulp.parallel(watch)
gulp.task("default", build)