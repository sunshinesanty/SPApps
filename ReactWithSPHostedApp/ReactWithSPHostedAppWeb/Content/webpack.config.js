var webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: ['eval','source-map-loader'],
    entry: './content/index',
    // Enable sourcemaps for debugging webpack's output.
    module: {
        loaders: [
            { test: /\.tsx?$/, exclude:"./tsOut", loaders: ['babel-loader', 'ts-loader'] },
            { test: /\.ico$/, loader: 'file?name=[name].[ext]' },
        ],
        postLoaders: [
            { test: "./Content/app/app.js", loaders: ['source-map-loader'] }
        ]
    },
    output: {
        filename: './content/app/app.js',
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        extensions: ['','.jsx', 'js', '.tsx', '.ts']
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};