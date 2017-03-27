const webpack = require("webpack");
const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    singleRun: true,
    basePath: "",
    frameworks: ["mocha"],
    browsers: [
        "PhantomJS"
    ],
    reporters: ["mocha", "karma-remap-istanbul"],
    remapIstanbulReporter: {
      reports: {
        html: "coverage",
        "text-summary": null
      }
    },
    preprocessors: {
        "test/index.test.ts" :  ["webpack", "sourcemap"]
    },
    files : [
        { pattern: "node_modules/html5-history-api/history.js", included: true },
        { pattern: "test/index.test.ts", included: true }
    ],
    port: 9876,
    colors: true,
    autoWatch: false,
    logLevel: config.LOG_INFO,
    phantomjsLauncher: {
      exitOnResourceError: true
    },
    webpack: webpackConfig
  });
};
