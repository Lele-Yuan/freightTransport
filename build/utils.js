var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var SpritesmithPlugin = require('webpack-spritesmith');
var pageConfig = require('../config/pageConfig.js')
var glob = require('glob');
const nconf = require('nconf');

//必定事先声明webpack，不然下面会不识别webpack
const webpack = require('webpack')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }
    // loaders.push({ test: /\.css$/, loader: 'style!css!px2rem?remUnit=75&remPrecision=8' })
    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// 获取当前运行的环境，并根据不同的环境，加载不同的配置文件
exports.getOperateConfigJsonData = function(){
  nconf.argv();
  var operateConfigMode = nconf.get('operate');
  var operateConfigFileData = require('../config/operate_'+operateConfigMode+'.json');

  var operateConfigJsonData = {};
  for(var i in operateConfigFileData){
    operateConfigJsonData[i] = "'"+operateConfigFileData[i]+"'";
    // console.log(operateConfigJsonData,'000000000000000')
  }
  return operateConfigJsonData;
}

createSpritesmithPlugin =  function (name,imgPath,cssPath,cssType){
  return new SpritesmithPlugin({
      src: {
          cwd: `${imgPath}/sprites/${name}/`,
          glob: '*.png'
      },
      target: {
          image: `${imgPath}/sprites/build/${name}.png`,
          css: [

                    [`${cssPath}/sprites/${name}.${cssType}`, {
                        format: 'retinaOnly'
                    }]
                ]
      },
      apiOptions: {
       cssImageRef: `~${name}.png`
      },
      spritesmithOptions: {
        padding:4
        // algorithm: 'top-down'
      },
      customTemplates: {
       retinaOnly: require.resolve('../config/scss_retina.template.handlebars')
      }
      
  })
}

exports.getCssSpritesPlugins = function(imgPath,cssPath,cssType){
  let plugins = []
  glob.sync('./'+imgPath+'/sprites/*').forEach(dirPath=>{
    let name = dirPath.replace('./'+imgPath+'/sprites/','')
    if(name=='build') return
      let dirImg = path.resolve(__dirname, '../'+imgPath)
      let dirCss = path.resolve(__dirname, '../'+cssPath)
    plugins.push(createSpritesmithPlugin(name,dirImg,dirCss,cssType))
  })
  plugins.push(
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    })
  )
  return plugins
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.getPageConfig = function(){
  return pageConfig
}
exports.getPageMultiEntry = function(fileName){
  var entries = {}
  pageConfig.forEach(i=>{
    entries[i.name] = i.path + fileName
  })
  return entries
}
