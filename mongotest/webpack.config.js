module.exports = {
    entry: './main.jsx',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.node$/,
                loader: "node-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.jsx', '.es6', '.babel', '.node']
    },
    node: {
        fs: 'empty',
        tls: 'empty',
        net: 'empty',
        module: 'empty'
    }
}