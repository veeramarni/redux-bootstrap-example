module.exports = function (config) {
  config.set({
    singleRun: true, // Disable to debug
    basePath: "",
    frameworks: ["mocha"],
    browsers: [
        "PhantomJS"
    ],
    reporters: ["mocha", "coverage", "karma-remap-istanbul"],
    coverageReporter: {
      dir : "coverage/"
    },
    remapIstanbulReporter: {
      reports: {
        html: 'coverage'
      }
    },
    plugins : [
        "karma-mocha-reporter",
        "karma-coverage",
        "karma-mocha",
        "karma-phantomjs-launcher",
        "karma-remap-istanbul"
    ],
    preprocessors: {
        "temp/bundle/index.js" :  ["coverage"]
    },
    files : [
        { pattern: "node_modules/html5-history-api/history.js", included: true },
        { pattern: "temp/bundle/index.js", included: true }
    ],
    port: 9876,
    colors: true,
    autoWatch: false,
    logLevel: config.LOG_INFO
  });
};
