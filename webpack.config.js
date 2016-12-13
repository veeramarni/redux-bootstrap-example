const { CheckerPlugin } = require("awesome-typescript-loader")

module.exports = {
    entry: [
        "./src/index.tsx"
    ],
    devServer: {
        inline: true
    },
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist/"
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint' },
            { test: /\.tsx$/, loader: 'tslint' },
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ],
    tslint: {
        emitErrors: true,
        failOnHint: true
    }
};

/*
TODO
- ENVIRONMENTS
- HOT MODULE REPLACEMENT
- SERVER SIDE RENDERING
- SASS
- DEBUGGING WITH SOURCE MAPS
- UNIT TEST (MOCHA)
- BROWSER TEST (KARMA)
- TREE SHAKING?
*/