const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('gulp-buffer');
const changed = require('gulp-changed');
const connect = require('gulp-connect');
const { exec } = require('child_process');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const tap = require('gulp-tap');
const terser = require('gulp-terser');
const util = require('util');

// Run shell commands
const run = util.promisify(exec);

/**
 * Settings
 */
const base = `${process.cwd()}/`;
const src = `${base}src/`;
const dest = `${base}build/`;

const sourcePaths = {
  css: `${src}_css/*.{pcss,css}`,
  scripts: `${src}_js/*.mjs`,
  html: [
    `${src}**/*.html`,
  ],
};

const destPaths = {
  styles: `${dest}assets/css`,
  scripts: `${dest}assets/js`,
};

/**
 * Build tasks
 */

function jekyll() {
  return run('bundle exec jekyll build', {
    cwd: `${process.cwd()}/src/`,
  });
}

function html() {
  return gulp.src(`${dest}**/*.html`, { follow: true })
    .pipe(connect.reload());
}

// Styles
function css() {
  return gulp.src(sourcePaths.css, { follow: true })
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(postcss())
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(destPaths.styles))
    .pipe(connect.reload());
}

// Scripts
function js() {
  return gulp.src(sourcePaths.scripts, { read: false })
    .pipe(tap((file) => {
      // eslint-disable-next-line no-param-reassign
      file.contents = browserify(file.path, {
        debug: true,
        extensions: [
          '.cjs',
          '.js',
          '.mjs',
        ],
      })
        .transform(babelify, {
          extensions: [
            '.cjs',
            '.js',
            '.mjs',
          ],
          global: true,
          ignore: [
            /\/node_modules\/(?!@coopdigital\/)/,
          ],
        })
        .bundle();
    }))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(terser())
    .pipe(rename({ extname: '.js' }))
    .pipe(sourcemaps.write('maps/'))
    .pipe(gulp.dest(destPaths.scripts))
    .pipe(connect.reload());
}

/**
 * Watch tasks
 */
function watch(done) {
  gulp.watch(['src/_css/**/*.{pcss,css}', '../packages/**/*.{pcss,css}'], css);
  gulp.watch(['src/_js/**/*.{cjs,js,mjs}'], js);
  gulp.watch(['../packages/**/*.{pcss,css,html,jpg,jpeg,gif,png,webp,svg}', '!../packages/**/node_modules/**']);
  gulp.watch(sourcePaths.html, gulp.series(jekyll, html));
  done();
}

/**
 * Local server
 */
function serve(done) {
  connect.server({
    host: '0.0.0.0',
    port: 9000,
    root: 'build',
    livereload: true,
  });
  done();
}

/**
 * Run tasks
 */
const build = gulp.parallel(gulp.series(jekyll), css, js);
const server = gulp.series(build, serve, watch);

// Use Design System gems
process.env.BUNDLE_GEMFILE = `${base}Gemfile`;

module.exports = {
  jekyll,
  css,
  js,
  build,
  server,
  default: server,
};
