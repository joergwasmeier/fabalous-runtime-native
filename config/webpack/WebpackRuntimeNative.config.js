var path = require('path');
var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
new webpack.ExtendedAPIPlugin();

function getDevTool(){
    try {
        return __devTool;
    } catch(e){
        return 'source-map';
    }
}

function getHost(){
    try {
        return __host;
    } catch (e){
        return 'localhost'
    }
}

function getPort(){
    try{
        return __port;
    } catch (e){
        return '8080';
    }
}

function getAlias(){
    try {
        return __alias;
    } catch (e){
        return {};
    }
}

module.exports = {
    output: {
        path: path.join(__workDir, './dist/web/debug'),
        chunkFilename: 'bundle-[chunkhash].js'
    },

    cache: true,
    performance: { hints: false },
    devtool: getDevTool(),

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.less'],
        alias: getAlias()
    },

    entry: {
        app: [
            path.join(__workDir, './src/A_Web.ts'), // Your appʼs entry point
            'webpack-dev-server/client?http://'+getHost()+':'+getPort()+'/', // WebpackDevServer host and port
            'webpack/hot/only-dev-server' // "only" prevents reload on syntax errors
        ]
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                include: [
                    path.join(__workDir, './src/')
                ],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
                include: [
                    path.join(__workDir, './src/')
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':  JSON.stringify("development"),
            'process.env.FABALOUS_RUNTIME': JSON.stringify("web"),
            'process.env.FABALOUS_DEBUG': JSON.stringify("1")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            minChunks: function(module, count) {
                return !isExternal(module) && count >= 2; // adjustable cond
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            chunks:["app"],
            minChunks: function(module) {
                return isExternal(module);
            }
        }),
        new ProgressBarPlugin(),
        new HtmlWebpackPlugin({
            hash:true,
            template: path.join(__workDir, './src/common/web/index.ejs')
        }),
        new webpack.NamedModulesPlugin()
    ]
};

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }

    return userRequest.indexOf('bower_components') >= 0 ||
        userRequest.indexOf('node_modules') >= 0 ||
        userRequest.indexOf('libraries') >= 0;
}