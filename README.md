### 运行方法
1. 下载代码 
   如有git客户端，可直接在命令行中运行 git clone git@github.com:dandan3029/TodoListRedux.git
2. 安装react环境 
   在项目所在目录中运行 
   ```js
   npm install
   ```
   （事先需要安装npm）
3. 安装redux环境
   在项目所在目录中运行 
   ```js
   npm install redux
   npm install react-redux
   ```
4. 安装antd的UI框架 
   * 在项目文件夹中命令行输入 npm install antd --save
   * 为了支持按需引入，需要使用 babel-plugin-import  命令行输入npm install babel-plugin-import --save-dev
   * 修改配置文件 在package.json中修改 babel-loder option
     添加 
     ```json
     // .babelrc or babel-loader option
        {
            "plugins": [
                ["import", {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": "css" // `style: true` 会加载 less 文件
                }]
            ]
        }
    ```
5. happy hacking! ^_^