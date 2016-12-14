"use strict";

//******************************************************************************
//* DEPENDENCIES
//******************************************************************************
var gulp = require("gulp"),
    tslint = require("gulp-tslint"),
    karma = require("karma"),
    browserify = require("browserify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    tsify = require("tsify"),
    sourcemaps = require("gulp-sourcemaps"),
    runSequence = require("run-sequence");

//******************************************************************************
//* LINT ALL
//******************************************************************************
gulp.task("lint", function() {
    
    var config =  { formatter: "verbose", emitError: (process.env.CI) ? true : false };

    return gulp.src([
        "src/**/**.test.ts",
        "src/**/**.test.tsx",
        "test/**/**.test.ts",
        "test/**/**.test.tsx"
    ])
    .pipe(tslint(config))
    .pipe(tslint.report());

});

//******************************************************************************
//* BUILD TESTS
//******************************************************************************
gulp.task("bundle", function() {

  var mainFilePath = "test/index.test.ts";
  var outputFolder   = "temp/bundle";
  var outputFileName = "index.js";

  var bundler = browserify({
    debug: true
  });

  // TS compiler options are in tsconfig.json file
  return bundler.add(mainFilePath)
                .plugin(tsify)
                .bundle()
                .pipe(source(outputFileName))
                .pipe(buffer())
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(sourcemaps.write())
                .pipe(gulp.dest(outputFolder));
});

//******************************************************************************
//* RUN TEST
//******************************************************************************
gulp.task("karma", function (done) {
  new karma.Server({
    configFile: __dirname + "/karma.conf.js"
  }, function(code) {
        if (code === 1){
           console.log('Unit Test failures, exiting process');
           done('Unit Test Failures');
        } else {
            console.log('Unit Tests passed');
            done();
        }
    }).start();
});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
  runSequence(
      "lint",
      "bundle",
      "karma",
      cb
    );
});
