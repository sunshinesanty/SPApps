var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",
    entry: {        
        app: ['./src/index.ts'],
        vendor: [
            'angular/angular.js',
            'angular-sanitize'
        ]
    },
    output: {
        filename: 'bundle.js',
        path: __dirname + "/build/"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
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
                loader: 'style!css!less'
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendors.js' })
    ],
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    }
};