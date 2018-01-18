const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const path = require('path');

module.exports = {
    entry: './source/core.js',
    output: {
        path: __dirname + '/build/',
        filename: 'game.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            'add-module-exports'
                        ]
                    }
                }
            },
            {
                test: /\.(png)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: './build'
    },
    plugins: [
        new WebpackCleanupPlugin({
            exclude: ['index.html'],
        }),
        new CopyWebpackPlugin.default([
            {from: './source/html/index.html', to: './'},
        ])
    ],
    resolve: {
        modules: [
            path.resolve('./node_modules'),
            path.resolve('./source/engine'),
            path.resolve('./source/'),
        ]
    },
};