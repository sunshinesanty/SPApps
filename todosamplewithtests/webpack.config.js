module.exports = {
    entry: ['./src/index.tsx'],
    output: {
        filename: 'main.js',
        chunkfile: '[id].chunk.js',
        path: __dirname + '/bundle'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    modules: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.ts?$/, loader: 'ts-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}