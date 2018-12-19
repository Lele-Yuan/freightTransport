var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')


function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var entries = utils.getPageMultiEntry('/index.js')


// var entries =  utils.getMultiEntry('./src/view/**/*.js'); // 获得入口js文件
// var chunks = Object.keys(entries);

console.log('entries',entries)
entries.vendor = [
  'vue',
  'vue-router',
]

// console.log('0000000000000',chunks)

module.exports = {
  // entry: {
  //   app: './src/main.js', 
  //   vendors:['vue','vue-router'],   // 需要被提取为公共模块的群组
  // },
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'jquery': 'jquery',
    },
    modules: ["node_modules", "assets/images/sprites/build", "assets/css/sprites"]
  },
  plugins : utils.getCssSpritesPlugins('src/assets/images','src/assets/css','scss'),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'), 
          resolve('test'),
          resolve('node_modules/_js-pinyin@0.1.9@js-pinyin'),
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }],
        include: path.join(__dirname, 'src', 'scss'),
      },
    ]
  }
}
