module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : './',
  outputDir: 'dist',
  assetDir: 'static',
  indexPath: 'index.html',
  productionSourceMap: false, // 默认true,建议false，关闭生产环境source map
  configureWebpack: { // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本
  }
}
