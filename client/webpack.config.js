const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // This plugin extracts CSS into separate files. It creates a CSS file per JS file which contains CSS. It supports On-Demand-Loading of CSS and SourceMaps.

module.exports = {
    // mode: 'development', // This option is for development. webpack optimizes accordingly.
    mode: 'production', // This option is deploying your app to production. webpack optimizes accordingly.
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../public')
        },
        port: 3000, // the port webpack-dev-server listens to
        open: {
            app: {
                name: 'Google Chrome'
            }
        }, // open the page in browser
        hot: true,   //  HMR means that when you change something in your code, it doesn't refresh the whole page, just the part that was changed.
        compress: true, // enable gzip compression
        historyApiFallback: true, // This option enables support for serving HTML5 History API fallback responses.
        proxy: {
            '/api': 'http://localhost:5000' // This proxy allows you still run the app in development mode
        }

    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    // Add the plugin to the plugins array
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin()
    ]

}