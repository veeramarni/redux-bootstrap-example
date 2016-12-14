const { CheckerPlugin } = require("awesome-typescript-loader")
var Visualizer = require("webpack-visualizer-plugin");
const webpack = require("webpack");

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
            {
                test: /\.tsx?$/, 
                loader: "awesome-typescript-loader"
            },
            {
                test: /\.scss$/,
                loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
            }
        ],
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new Visualizer({
            filename: './statistics.html'
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};
