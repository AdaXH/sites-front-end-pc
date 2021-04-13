// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const theme = require('./src/config/theme');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: path.resolve(__dirname, 'src', 'app.ts'),
  output: {
    filename: 'sites-pc.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/siteslib/pclib/',
    chunkFilename: 'sites-pc.[name].async.js',
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx', '.css', '.less', '.ts', '.tsx'],
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.ts|tsx$/,
        loader: ['happypack/loader?id=babel', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]_[local]-[hash:base64:5]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme,
            },
          },
        ],
        exclude: /src/,
      },
    ],
  },
  stats: {
    children: false,
    warningsFilter: (warn) => warn.indexOf('Conflicting order between:') > -1,
  },
  node: {
    fs: 'empty',
    module: 'empty',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|less)/,
          chunks: 'all',
          enforce: true,
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
      },
    },
    runtimeChunk: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      // template: path.resolve(__dirname, "src", "index.ejs"), // 模板
      filename: 'index.html',
      // hash: true // 防止缓存
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
        },
      ],
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true,
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
    }),
  ],
};
