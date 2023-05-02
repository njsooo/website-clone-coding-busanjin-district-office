const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getWebpackEntry = require('./webpack_lib/getWebpackEntry');
const getHtmlWebpackPluginList = require('./webpack_lib/getHtmlWebpackPluginList');

module.exports = (env) => ({
  entry: getWebpackEntry(),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[contenthash].js',
    /*
      There is a problem with images disappearing when using webpack-dev-server.
      Image loaded from html img tag disapper but image loaded from js, css doesn't disapper.
      The solution is here.
      https://stackoverflow.com/questions/72498866/webpack-images-disappear-after-browser-refresh-using-webpack-dev-server
    */
    clean: env.WEBPACK_BUILD,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
            },
          },
          {
            loader: 'posthtml-loader',
            options: {
              plugins: [require('posthtml-include')({ root: './src/html' })],
            },
          },
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          env.WEBPACK_BUILD ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css',
    }),
  ].concat(getHtmlWebpackPluginList()),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    watchFiles: ['src/html/**/*.html'],
    hot: true,
    liveReload: true,
  },
  performance: {
    hints: false,
  },
});
