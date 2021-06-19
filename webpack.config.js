const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            use: ['style-loader', 'css-loader'],
            test: /\.css$/
        }]
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};
