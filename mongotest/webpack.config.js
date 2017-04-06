module.exports = {
    entry: {
        bundle: './src/components/main.jsx'
    },
    output: {
        path: './dist',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: ['/node_modules/', '/server/'],
                loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}