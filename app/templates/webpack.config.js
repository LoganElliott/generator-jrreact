'use strict';

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

let config = {
    context: path.join(__dirname, 'src'),
    entry: './app.js',
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'app-bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'react-hot!babel',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: 'style!css?sourceMap!postcss'
        },{
            test: /\.scss$/,
            loader: 'style!css?sourceMap!postcss!sass?sourceMap'
        },{
            test: /\.json$/,
            loader: 'json'
        }]
    },
    postcss: function () {
        return [autoprefixer];
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        port: 8080
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: '<%= appname %>',
            template: 'index.template.html',
            hash: true
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.output.path = path.join(__dirname, 'dist');
    config.devtool = 'source-map';
    config.devServer = null;
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': JSON.stringify('production')}
    }));
}

module.exports = config;
