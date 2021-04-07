const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const theme = require('./src/config/theme');

module.exports = {
  entry: ['./src/app.ts'],
  output: {
    filename: 'sites-pc.js',
    path: path.resolve(__dirname, './cache'),
    publicPath: '/',
    chunkFilename: 'sites-pc.[name].async.js',
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath: '/',
    contentBase: './src',
    host: 'localhost',
    port: 8001,
    open: false,
    inline: true,
    openPage: '',
    hot: true,
    historyApiFallback: true,
    overlay: {
      errors: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5050',
        changeOrigin: true,
        pathRewrite: { api: '/' },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx', '.css', '.less', '.ts', '.tsx'],
  },
  stats: {
    children: false,
    warningsFilter: (warn) => warn.indexOf('Conflicting order between:') > -1,
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['source-map-loader', 'babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.ts|tsx$/,
        use: ['source-map-loader', 'babel-loader', 'awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
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
          'css-hot-loader',
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
      },
    },
  },
  plugins: [
    // new CaseSensitivePathsPlugin({ debug: true }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      filename: 'index.html',
      hash: true,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'public'),
    //     },
    //   ],
    // }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
