### 写作初衷
刚学习webpack，希望能够在一个实际的项目中进行实践，从而加深对webpack的理解，从网上找了很多教程，但是缺少源码的支撑，实践起来还是会有很多问题。于是，我就去看了webpack的官方文档，一步一步地跟着教程中的项目实践，之后又在自己之前的React+Redux小项目中进行了实践，也就是现在这个项目，在这里记录一下自己所遇到的坑，也希望能给初学者带来那么一点点帮助。

#### 一. 首先要安装webpack相关依赖包
* 在命令行项目路径下运行
```js
npm install webpack --save-dev          // webpack包
npm install webpack-cli --save-dev      // 如果你使用 webpack v4+ 版本，你还需要安装 CLI
```
* 修改package.json文件
```js
"scripts": {
    "build": "webpack",
}
```
#### 二. 为了将css文件，scss文件，图片打包
* 安装一些loader，在命令行项目路径下运行：
```js
npm install --save-dev style-loader  // 将 JS 字符串生成为 style 节点
npm install --save-dev css-loader    // 将 CSS 转化成 CommonJS 模块
npm install --save-dev sass-loader   // 将sass编译成css
npm install --save-dev file-loader   // 为了引入图片
```

* 同时，需要在项目根目录中添加配置文件webpack.config.js（以下简称为配置文件）中添加如下代码：
```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
               },
            {
            test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
        ]
    }
}
```
#### 三. 为了能够使用jsx语法
需要添加babel-loader，此时可能会出现各种版本错误，要小心配置，注意版本问题。
* 命令行运行：
```js
npm install @babel/preset-env --save-dev
npm install @babel/preset-react --save-dev
npm install babel-core --save-dev
npm install babel-loader --save-dev
```
* 修改配置文件
```js
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react','@babel/preset-env']
                }
            }
        }
    ]
}
```

至此，所有打包相关的依赖都已经安装完毕了，接下来需要写一些接口相关的配置。

#### 四. 在项目根目录中新建文件夹dist
在dist文件夹中新建一个index.html文件（项目打包后的入口文件），并写入以下代码：
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Todo List with Redux & Webpack</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="text/javascript" src="bundle.js"></script>
  <!-- 此处的bundle.js就是我们打包好的js文件 -->
</html>
```

#### 五. 修改配置文件webpack.config.js
添加如下代码：
```js
var path = require('path');

module.exports = {
    entry: {
        app: './src/index.js',  // 即为原本项目的入口文件
    },
    output: {
        filename: 'bundle.js',  // 项目打包后输出的文件
        path: path.resolve(__dirname, 'dist'),  // 项目打包后输出文件的路径
    },
    mode: 'development',        // 共有两个模式，一个为development，另一个为production
}
```

至此，基本的配置已经完成了，然后命令行运行 npx webpack ，如果一切正常的话，就会在dist文件夹中产生bundle.js文件，在浏览器打开index.html就可以看到自己的项目了。然而也可能会出现静态资源超过最大限制的警告信息，并且页面是空白的情况。对此，如果暂时不考虑浏览器性能，我们可以在配置文件中添加以下代码：
```js
performance: { 
    maxEntrypointSize: 400000000000000,  // 这里的数字可以尽可能大
    maxAssetSize: 10000000000000         // 这里的数字可以尽可能大
}
```

另外，像以上所说的如果我们每次改动代码，都需要在命令行中执行npx webpack命令，然后浏览器打开静态文件index.html就显得过于麻烦，所以我们选择本地服务器的方法来进行实时自动更新。

#### 六. webpack-dev-server
* 在命令行中项目路径下运行： npm install --save-dev
* 修改配置文件，添加如下代码
```js
devServer: {
    contentBase: './dist'
},
```
* 修改package.json文件
```js
 "scripts": {
    "start": "webpack-dev-server --open",
 }
```
* 命令行运行npm start， 此时浏览器会跳转到localhost: 3000 。之后再改动代码之后会自动打包，并在浏览器中自动刷新，这样会使开发更加方便。

#### 七. bundle.js与源代码之间的映射
如果需要调试代码时，浏览器报错bundle.js中出现错误，然而我们并不知道源代码中的哪个文件中的哪一行出现了错误，这样就对调试造成了极大的不便。为了解决这个问题，可以使用source-map。
* 在webpack.config.js中添加如下代码：
```js
devtool: 'inline-source-map',
```

至此，我们的webpack已经可以打包含有scss文件，图片，jsx语法的react-redux项目，并且可以在浏览器中实时更新，以及源码的映射。
希望能对优秀的你有所帮助^_^
happy hacking^_^