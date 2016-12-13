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
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
};

/*
TODO
- ENVIRONMENTS / TREE SHAKING
- SERVER SIDE RENDERING
- SASS
- BROWSER TEST (KARMA)
*/