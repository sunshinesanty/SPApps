module.exports = {
    entry: "./src/app.tsx",
    output: {
        filename: "./dist/bundle.js"        
    },
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module:{
        loaders:[
            {test: /\.tsx?$/, loader: "ts-loader"},
            {test: /plugin\.css?$/, loader: ['style', 'css']},
        ],
        preloader:[{test: /\.js?$/, loader: "source-map-loader"}]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
}