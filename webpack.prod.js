//生产环境
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  devtool: 'hidden-source-map',
  mode: 'production',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    filename: '[name].[hash].js',
    hashDigestLength: 7,
    path: path.resolve(__dirname, 'build'),
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css']
  },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'babel-preset-env', 'stage-3'],
            plugins: [["transform-class-properties"],["import",{ "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'common/vendor',    
          priority: 10
        },
        utils: {
          test: /\.js$/,
          chunks: 'initial',
          name: 'common/utils',
          minSize: 0
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'sight',
      template: 'public/index.html',
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css"
    }),
    new UglifyJSPlugin({
      test: /(\.jsx|\.js)$/,
      extractComments: true,
      parallel: true,
      cache: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    // contentBase: path.resolve(__dirname,'src/index.js'),
    compress: true
  },
  externals: {
    "antd":"antd"
  }
};