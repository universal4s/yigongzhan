const path = require("path")
const webpack = require("webpack")
module.exports = {
    mode: "development",
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {//配置dev-server 命令参数的第二种形式，相对来说，这种方式麻烦一些
        open: true,//自动打开浏览器
        port: 8080,//设置启动端口
        contentBase: 'src',
        host: '127.0.0.1',
        hot: true,
        proxy: {

        }
    }
}