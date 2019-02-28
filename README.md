# VUE 脚手架

> vue-router & vuex & axios & element-ui


## 直接运行方法

### 前端页面
``` bash
# 克隆整个项目
git clone http://git.michaelxu.cn/classroom/vue/vue-webpack-start.git

# 安装依赖包
npm install

# 热启动
npm run dev

# 打包部署
npm run build

```

## 从头自己搭建方法

```
# 全局安装 vue-cli
npm install -g vue-cli

# 创建一个基于 webpack 模板的新项目
vue init webpack vue-webpack-start

# 按照下面图示配置，后期可以在 package.json 文件里修改
```
![](http://git.michaelxu.cn/classroom/vue/vue-webpack-start/raw/develop/src/assets/images/webpack-init.png)
```
# 安装依赖
cd vue-webpack-start
npm i axios -S
npm i vuex -S
npm i element-ui -S
```
## 使用讲解
### 安装第三方 UI [element](http://element-cn.eleme.io/#/zh-CN/component/installation)
**全部引用**
```
# npm 安装
npm i element-ui -S

# 在项目的入口文件 main.js 中引入库和样式
import ElementUI from 'element-ui' // 完整引入
import 'element-ui/lib/theme-chalk/index.css'

# 引用 ElementUI
Vue.use(ElementUI) // 完整引用

# 使用 ElementUI
<el-button type="primary">按钮</el-button>

```

![](http://git.michaelxu.cn/classroom/vue/vue-webpack-start/raw/develop/static/element-ui.png)

**按需引用**

```
# npm 安装
npm i element-ui -S

# 安装 babel-plugin-component
npm install babel-plugin-component -S

# 将 .babelrc 修改为
{
  "presets": [["env", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

# 在项目的入口文件 main.js 中引入库和样式
import { Button } from 'element-ui' //按需引入

# 引用 ElementUI
Vue.use(Button) // 按需引用

```

![](http://git.michaelxu.cn/classroom/vue/vue-webpack-start/raw/develop/static/element-button.png)
推荐按需引入缩小vender包大小

**使用主题**

```
# 安装「主题生成工具」
npm i element-theme -S

# 安装白垩主题
npm i element-theme-chalk -S

# 初始化变量文件,默认输出到 /element-variables.scss ，以后需要修改主题样式请修改此文件，再执行下面命令（生成主题文件目录），并引入到页面
node_modules/.bin/et -i

# 生成主题文件目录 /theme
node_modules/.bin/et -w // -w 参数是监听文件改动自动编译

# 在项目的入口文件 main.js 中主题样式
import '../theme/index.css' 
```


### Vue Devtools 开发者工具
在使用 Vue 时，我们推荐在你的浏览器上安装 [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)。它允许你在一个更友好的界面中审查和调试 Vue 应用。


### 各种第三方类库
[awesome-vue](https://github.com/vuejs/awesome-vue)

### 推荐路由按需异步加载

```
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
```

该组件所依赖的其他组件或其他模块，都会自动被分割进对应的 chunk 里，实现异步加载，当然也支持把组件按组分块，将同组中组件，打包在同个异步 chunk 中。如此能够非常有效的抑制 Javascript 包过大，同时也使得资源的利用更加合理化。webpackChunkName会将组件打包进名字相同的压缩文件

## Webpack 打包分析

### 文件打包分析

[webpack-bundle-analyze](https://www.npmjs.com/package/webpack-bundle-analyzer)

方便直观的展示图让你明白打包文件中引入的真正内容。我们可以借助它，发现它大体有哪些模块组成，找到不合时宜的存在，然后优化它。

1. 安装

    ```
    npm install --save-dev webpack-bundle-analyzer
    ```

      在webpack.js中添加：

    ```
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    
    module.exports = {
      plugins: [
        new BundleAnalyzerPlugin()
      ]
    }
    ```

1. 执行

    ```
    npm run build
    ```

打包完成之后会默认在[http://127.0.0.1:8888](http://127.0.0.1:8888/) 打开展示页面

实例如下：

![示例](/Users/songwenkai/Documents/hg/word/webpack.png)


stat中显示的是打包之前的文件大小，parsed中显示打包后文件大小，gzipped显示压缩文件部分。

vender中主要是一些外部库，自己的代码在app中。

####常用压缩方法

#### 开启gzip压缩

```
 npm install --save-dev compression-webpack-plugin
```

webpack.js中添加

```
const CompressionWebpackPlugin = require('compression-webpack-plugin');

    //在 plugin 中添加
    new CompressionWebpackPlugin({ //gzip 压缩
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
        ),
        threshold: 10240,
        minRatio: 0.8
    })
```

并不是所有浏览器都支持gzip压缩方式，浏览器是否支持gzip可在http请求头中查看

#### 使用ExtractTextPlugin

```
npm install --save-dev extract-text-webpack-plugin
```

webpack.js中

```
plugins: [ 
	new ExtractTextPlugin('[name].[contenthash].css') 
]
```

将css单独打包，避免以后修改css时导致js缓存失效。

#### 路由按需加载

在Vue项目中，一般使用vue-cli构建项目后，我们会在Router文件夹下面的index.js里面引入相关的路由组件,如：

```
import Layout from '../views/layout/Layout'
import start from '../views/start'
```

​	1.webpack提供的require.ensure(),这样可以实现按需加载，并且你可以将多个相同类的组件打包成一个文件。

```
const Layout = r => require.ensure([], () => r(require('../views/layout/Layout')), 'layout');
const start = r => require.ensure([], () => r(require('../views/start')), 'start');
```

chunkName相同的会被打包到同一个文件；

​	2.Vue的异步组件技术，这种方法可以实现按需加载，并且一个组件会打包成一个js文件

```
const Layout = resolve => require(['../views/layout/Layout'], resolve)
const start = resolve => require(['../views/start'], resolve)
```

​	3.按需异步加载模块，该组件所依赖的其他组件或其他模块，都会自动被分割进对应的 chunk 里，实现异步加载，当然也支持把组件按组分块，将同组中组件，打包在同个异步 chunk 中。如此能够非常有效的抑制 Javascript 包过大，同时也使得资源的利用更加合理化。

```
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
```

#### 按需引入

使用第三方库或者依赖尽量按需引入

例如element-ui

```
import ElementUI from 'element-ui'
```

可在组件中使用单个组件时引入

element-ui根据官方说明，先需要引入[babel-plugin-component](https://link.jianshu.com/?t=https://link.zhihu.com/?target=https%3A//github.com/QingWei-Li/babel-plugin-component)插件，做相关配置，然后直接在组件目录，注册全局组件。

1.安装babel-plugin-component插件：

```
npm install babel-plugin-component –D
```

2.配置插件，将.babelrc修改为：

```
{

	"presets": [
		["env", { "modules": false }]

	 ],

	"plugins": [["component", [

		{

			"libraryName": "element-ui",

			"styleLibraryName": "theme-default"

		}
		]
	]
	]
}

```

3.引入部分组件，比如Button和Select，那么需要在main.js中写入以下内容：

````
import Vue from 'vue'

import { Button, Select } from 'element-ui'

import App from './App.vue'

Vue.component(Button.name, Button)

Vue.component(Select.name, Select)

/*或写为

*Vue.use(Button)

*Vue.use(Select)

*/
````

#### 外部引入

在webpack的externals中指定不参与打包的文件

```
// webpack 中予以指定
externals: {
  // 'vue': 'Vue',
  // 'lodash': '_',
  'babel-polyfill': 'window'
}

//
<script src="//cdn.bootcss.com/autotrack/2.4.1/autotrack.js"></script>
<script src="//cdn.bootcss.com/babel-polyfill/7.0.0-alpha.15/polyfill.min.js"></script>
```

#### 总结

* 在使用ui库时,尽量使用按需加载方式.
* 异步加载,官方文档很详尽,改造起来也不难,可以试试
* 合理规划三方库的引用.,'收益'可能也不是很高,不过是个调整方向
* 善用webpack-bundle-analyzer优化项目依赖
* 服务端开启 gzip压缩,谁用谁知道！