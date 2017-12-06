var path = require('path');
var webpack = require('webpack');
var nodeModulesDir = path.resolve(__dirname, './node_modules');
const LoaderOptionsPlugin = require("webpack/lib/LoaderOptionsPlugin");

module.exports = {
    entry: {
        app: ['./src/index.ts'],
        vendor: [
            'angular/angular.js',
            '@uirouter/angularjs/release/angular-ui-router.js',
            'angular-sanitize'
        ]
    },
    context: __dirname + "",
    output: {
        filename: 'bundle.js',
        path: __dirname + "/bundle/",
        sourceMapFilename: 'bundle.map'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            }, {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {}
            }, {
                test: /\.html$/,
                use: [
                    {
                        loader: 'file-loader?name=[path][name].[ext]r',
                        options: { minimize: true }
                    },
                    { loader: 'extract-loader' },
                    { loader: 'html-loader' }
                ],
            }, {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" }, // creates style nodes from JS strings
                    { loader: "css-loader" },   // translates CSS into CommonJS 
                    { loader: "less-loader" }   // compiles Less to CSS
                ]
            }, {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendors.js' })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    devServer: {
        contentBase: path.join(__dirname, "bundle"),
        compress: true,
        port: 9001
    },
};