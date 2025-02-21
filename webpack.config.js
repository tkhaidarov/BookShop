var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // для генерации HTML из Pug
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevelopment = process.env.NODE_ENV === 'development';
module.exports = {
  entry: path.resolve(__dirname, './src/js/index.js'),
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, './public'),
    //clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], //ES5+ -> ES5
          },
        },
      },
      {
        test: /\.scss$/i,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: [path.resolve(__dirname, 'src/scss')],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/svg/[name][ext]',
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/index.pug'),
      filename: 'index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.scss', '.pug'],
    alias: {
      '@img': path.resolve(__dirname, './public/img'),
      '@src': path.resolve(__dirname, 'src'),
    },
  },

  devServer: {
    static: path.resolve(__dirname, 'public'),
    compress: true,
    port: 8080,
    hot: true,
  },
  mode: isDevelopment ? 'development' : 'production',
  optimization: {
    minimize: true,
  },
};
