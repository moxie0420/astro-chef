import {src, dest, watch, parallel, series} from "gulp";
import cleanCSS from "gulp-clean-css";
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import ts from "gulp-typescript";
import terser from "gulp-terser";
import gulpPlumber from "gulp-plumber";

const sass = gulpSass(dartSass);

const outdir: string = "./app/assets/builds"

const tsProject = ts.createProject("tsconfig.json");

function javascript() {
  return tsProject.src()
    .pipe(gulpPlumber())
    .pipe(tsProject()).js
    .pipe(terser())
    .pipe(dest(outdir));
}

function css() {
  return src(["app/assets/stylesheets/**/*.scss", "!app/assets/stylesheets/**/_*.scss"])
    .pipe(gulpPlumber())
    .pipe(sass().on("error",sass.logError))
    .pipe(cleanCSS())
    .pipe(dest("./app/assets/builds"))
}

const build = parallel(javascript, css)

const watchTS = () => watch(["./app/javascript/**/*.ts"], javascript);
const watchCSS = () => watch(["./app/assets/stylesheets/**/*.scss"], css);

const watchAll = series(build, parallel(watchCSS, watchTS));

export {build, watchAll as watch};
export default build;
