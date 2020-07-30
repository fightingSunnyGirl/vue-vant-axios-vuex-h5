module.exports = {
  plugins: {
    'autoprefixer': {
      overrideBrowserslist: ['> 0.15% in CN']
    },
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*'],
      selectorBlackList:['van'],//忽略转换正则匹配项 过滤vant组建 vantui跟字体设置的37.5
    }
  }
}