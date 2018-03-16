const open = require('open');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {

    // Webpack entry point scripts (those scripts explicitly included in the html):
    // Relative to context path
    entry: {
        index: ['./example']
    },

    // Webpack output config
    output: {
        // A filename pattern for the output files
        filename: '[name].js',

        // An absolute path to the desired output directory.
        path: 'example/__dist__',

        publicPath: '/__dist__/'
    },

    module: {
        loaders: [
            // Compile React compoments from Babel
            {
                test: /\.js$/,
                // ignore all node_modules except other roi components
                exclude: /node_modules\/(?!roi-.*)/,
                loaders: ['babel']
            },

            // extract less files
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap')
            }
        ]
    },
    postcss: function () {
        return [
            require('postcss-smart-import')({ /* ...options */ }),
            require('pixrem')(), // add fallbacks for rem units
            require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
            require('cssnano')() // minify the result
        ];
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new DashboardPlugin(),
        new DuplicatePackageCheckerPlugin()
    ],

    devServer: {
        contentBase: './example',
        inline: true,
        colors: true
    },

    devtool: 'source-map'
};

// Open the example in the browser
open('http://localhost:8080');
