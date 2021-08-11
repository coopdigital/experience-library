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



// 'use strict';

// const gulp = require('gulp');
// const sourcemaps = require('gulp-sourcemaps');
// const connect = require('gulp-connect');
// const concat = require('gulp-concat');
// const include = require('gulp-include');
// const jshint = require('gulp-jshint');
// const stylish = require('jshint-stylish');
// const uglify = require('gulp-uglify');
// const imagemin = require('gulp-imagemin');
// const postcss = require('gulp-postcss');
// const spawn = require('child_process').spawn;

// /**
//  * Settings
//  */
// const src = 'src/';
// const dest = 'build/';
 
// const src_paths = {
//   css: src + '_css/**/*.{pcss,css}',
//   temp: src + 'temp/**/*',
//   scripts: src + '_js/*.js',
//   assets: [
//     src + '_assets/**/*'
//   ],
//   html: src + '**/*.html'
// };

// const dest_paths = {
//   styles: dest + 'assets/css',
//   scripts: dest + 'assets/js',
//   assets: dest + 'assets'
// };

// const settings = {
//   css: {
//     outputStyle: 'compressed',
//   },
//   include: {
//     includePaths: [
//       __dirname + '/node_modules',
//       __dirname + '/src/_js',
//     ]
//   }
// };


// /**
//  * Lint tasks
//  */
// function lintjs() {
//   return gulp.src([
//     src_paths.scripts,
//     '!' + src + '_js/vendor'
//   ])
//     .pipe(jshint())
//     .pipe(jshint.reporter(stylish));
// }


// /**
//  * Build tasks
//  */

// // Jekyll
// function jekyll(gulpCallBack) {
//   const jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', cwd: 'src'});
//   jekyll.on('exit', function(code) {
//     gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
//   });
// }

// function html() {
//   return gulp
//     .src(dest + '**/*.html')
//     .pipe(connect.reload());
// }

// // Styles
// function css() {
//   return gulp.src(src_paths.css, { follow: true })
//     .pipe(sourcemaps.init({ loadMaps: true }))
//     .pipe(postcss())
//     .pipe(sourcemaps.write('maps/'))
//     .pipe(gulp.dest(dest_paths.styles))
//     .pipe(connect.reload());
// }

// // Scripts
// function js() {
//   return gulp.src(src_paths.scripts, { follow: true })
//     .pipe(sourcemaps.init({ loadMaps: true }))
//     .pipe(include(settings.include))
//     .pipe(concat('main.js'))
//     .pipe(uglify())
//     .pipe(sourcemaps.write('maps/'))
//     .pipe(gulp.dest(dest_paths.scripts))
//     .pipe(connect.reload());
// }

// function vendorjs() {
//   return gulp
//     .src([src + '_js/vendor/**/*'])
//     .pipe(gulp.dest(dest_paths.scripts + '/vendor'));
// }

// // Static assets
// function assets() {
//   return gulp
//     .src(src_paths.assets)
//     .pipe(gulp.dest(dest_paths.assets))
//     .pipe(connect.reload());
// }

// function optimiseImages() {
//   return gulp
//     .src(dest_paths.assets + '/images/**/*')
//     .pipe(imagemin())
//     .pipe(gulp.dest(dest_paths.assets + '/images'));
// }


// /**
//  * Watch tasks
//  */
// function watch(done) {
//   gulp.watch(['src/_css/**/**.{pcss,css}'], css);
//   gulp.watch(src_paths.scripts, gulp.series(lintjs, js));
//   gulp.watch(src_paths.assets, optimiseImages);
//   gulp.watch(src_paths.html, gulp.series(jekyll, html));
//   done();
// }


// /**
//  * Local server
//  */
// function serve(done) {
//   connect.server({
//     port: 9000,
//     root: 'build',
//     livereload: true
//   });
//   done();
// }

// /**
//  * Run tasks
//  */
// const build = gulp.parallel(gulp.series(jekyll), css, vendorjs, gulp.series(lintjs, js), gulp.series(assets, optimiseImages));
// const server = gulp.series(build, serve, watch);


// module.exports = {
//   jekyll,
//   css,
//   vendorjs,
//   lintjs,
//   js,
//   assets,
//   optimiseImages,
//   build,
//   server,
//   default: server
// };