var path = require('path');

module.exports = {
    entry: {
        app: ['./app/assets/app.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'app'),
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, "app/assets"),
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    optional: ['runtime'],
                    stage: 0
                }
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    }
};