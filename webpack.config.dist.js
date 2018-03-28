const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const DedupePlugin = webpack.optimize.DedupePlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

module.exports  = {
    // Webpack entry point scripts (those scripts explicitly included in the html):
    // Relative to context path
    entry: {
        index: ['./src/index-with-styles.js'],
        'index.min': ['./src/index-with-styles.js']
    },

    // Webpack output config
    output: {
        // An absolute path to the desired output directory.
        path: './dist/',

        // A filename pattern for the output files
        filename: '[name].js',

        // IMPORTANT!: This is the name of the global variable exported in browsers
        // Change it for the name you want your component to have as window.NAME
        library: '!!!!!!! ADD LIBNAME HERE !!!!!!!',

        libraryTarget: 'umd'
    },

    module: {
        loaders: [
            // Compile React compoments from Babel
            {
                test: /\.js$/,
                // ignore all node_modules except other roi components
                exclude: /node_modules\/(?!roi-.*)/,
                loader: 'babel'
            },

            // extract less files
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader?sourceMap!less-loader?sourceMap')
            },
            // extract images
            {
                test: /\.(svg|png|gif)/,
                loader: 'url-loader?limit=10000&name=[name].[ext]'
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
        // Create a css file per each initial chunk
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new DedupePlugin(),
        new UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new DuplicatePackageCheckerPlugin(),
        new Visualizer(),
    ],

    devtool: 'source-map'
};
