const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimiziCss = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const HardSourceWebpckPlugin = require('hard-source-webpack-plugin');
const  DonePlugin=require("./plugins/DonePlugin")
// const smp = new SpeedMeasurePlugin(); //分析每个loader、plugin等过程的花费时间

module.exports = {
  // mode: 'production',
  mode: "development",
  bail:false, //生产环境打包需要开启
  entry: './src/index.tsx',
  output: {
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].chunk.js',
    path: path.resolve(__dirname, 'build'), // 必须是一个绝对路径
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')],
    mainFields: ['jsnext:main', 'main'],
    extensions: ['.tsx', 'ts', '.js', '.json'],
  },
  module: {
    noParse: /jquery|lodash/, // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件。忽略的文件中 不应该含有 import, require, define 的调用，或任何其他导入机制
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          // "style-loader", 用了下面的MiniCssExtractPlugin.loader后就不需要style-loader插入css了
          {
            loader: MiniCssExtractPlugin.loader, // 抽成单独的文件，以link标签方式引入
            options: {
              esModule: false,
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // 兼容大多数浏览器，根据您的目标浏览器或运行时环境确定所需的Polyfills，需在packagejson中配置browserslist
                /* eslint-disable */
                require('postcss-preset-env')(),
              ],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              cacheDirectory: true, // 开启缓存
            },
          },
          'ts-loader',
          // "eslint-loader" 
        ],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 8889,
    contentBase: false,
    compress: true,
    hot: true,
    clientLogLevel: 'silent',
    historyApiFallback: true,
  },

  optimization: {
    minimizer: [
      // 压缩css文件和js文件
      new OptimiziCss(),
      new TerserPlugin({
        // 替代UglifyJsPlugin压缩js代码，UglifyJsPlugin现在不维护
        cache: true,
        parallel: true, // 并行压缩
        sourceMap: true,
      }),
    ],

    // 代码分割
    splitChunks: {
      chunks: 'all', // 执行默认配置
    },

    // 单独抽离runtime代码
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`, // 将包含 chunk 映射关系的列表从 main.js 中抽离出来
    },
  },

  stats: 'errors-only', // 构建只打印错误信息

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
      },
      hash: true,
    }),
    new MiniCssExtractPlugin({
      // 抽离css为一个单独的文件
      filename: '[name].[hash:8].css',
      chunkFilename: '[name].[hash:8].chunk.css',
    }),
    // new BundleAnalyzerPlugin(), //体积分析，默认在8888端口展示体积prd
    new HardSourceWebpckPlugin(), // 缓存插件，提高二次构建速度
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // 热更新下告诉哪个模块更新了
    new DonePlugin()
  ],
};
