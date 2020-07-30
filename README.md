# mobile

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 规范
1.文件或者class类名以下划线'_'连接;
2.每个页面要有一个总的class 为避免重复 可以命名为文件名_page;
3.每个样式表引入的地方都写上作用域scoped;
4.每个页面新建都用文件夹+index的方式;
5.组建统一在components里面;
6.js变量命名以驼峰为主;
7.js方法需加备注;
8.css下面的base中init.css是样式初始化,在main.js里面已经全局引用;
9.css下面的base中themes.less是主要的色值,需在当前less文件里面引入且使用;
10.css以less文件为主，需关闭掉自动生成css配置项;
11.router里面的路由采用和PC统一的中横线'-'链接;
12.vant本身移动适配是按照375设计稿适配的，改写该组件时单位值需除2(/2),纯功能性的不需要除列入滚动获取数据组建。


