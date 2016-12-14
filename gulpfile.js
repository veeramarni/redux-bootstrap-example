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
    istanbul = require("istanbul"),
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
           console.log("Unit Test failures, exiting process");
           done("Unit Test Failures");
        } else {
            console.log("Unit Tests passed");
            done();
        }
    }).start();
});

gulp.task("coverage", function (done) {

    // https://github.com/SitePen/remap-istanbul/issues/51#issuecomment-216466344

    var collector = new istanbul.Collector();
    var reporter = new istanbul.Reporter();

    reporter.add("html");
    reporter.addAll([ 'lcov', 'text' ]);

    var remappedJson = require("./coverage/coverage-remapped.json");
    var keys = Object.keys(remappedJson);
    var coverage = {};

    for (var i = 0; i < keys.length; i++) {
        if (keys[ i ].startsWith("src/")) {
            coverage[ keys[ i ] ] = remappedJson[ keys[ i ] ];
        }
    }

    collector.add(coverage);

    reporter.write(collector, true, function() {
        done();
    });

});

//******************************************************************************
//* DEFAULT
//******************************************************************************
gulp.task("default", function (cb) {
  runSequence(
      "lint",
      "bundle",
      "karma",
      "coverage",
      cb
    );
});
