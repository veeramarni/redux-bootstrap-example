const { CheckerPlugin } = require("awesome-typescript-loader")
var Visualizer = require("webpack-visualizer-plugin");
const webpack = require("webpack");

var corePlugins = [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new Visualizer({
        filename: './statistics.html'
    })
];

var devePlugins = [
    // Add dev plugins here
];

var prodPlugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
];

var plugins = process.env.NODE_ENV === "production" ? corePlugins.concat(prodPlugins) : corePlugins.concat(devePlugins)

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
    plugins: plugins
};
