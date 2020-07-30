
const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  // 项目部署的基础路径 默认/
  // 放在子目录时使用./或者加你的域名
  publicPath: process.env.BASE_URL,
  configureWebpack: {
    performance: {
      hints: false
    },
    plugins: []
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    https: false,
    hotOnly: false,
    // 设置代理，用来解决本地开发跨域问题
    proxy: {
      '/laqu': {
        'target': 'http://master.laqu.com',
        pathRewrite: {'^/laqu' : ''},
        secure: false,
        changeOrigin: true,
      }
    },
  },
  transpileDependencies: ['webpack-dev-server/client'],
	chainWebpack: config => {
    config.entry.app = ['babel-polyfill', './src/main.js'];
	}
}
