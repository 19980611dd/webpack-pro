// 把css抽取成styes标签 ，插入html
// css --> js
// less-loader
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { join } = require('path');
module.exports = {
    mode: "development",
    entry: "./src/main.js", // 入口
    output: {
        path: join(__dirname, "lib"), // 出口路径
        filename: "index.js", // 出口文件名
        // 删除上次的文件夹再打包
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            //建议是绝对路径
            template: join(__dirname, './public/index.html'),

        }),
        new VueLoaderPlugin()
    ],
    devServer: {
        open: true,
        port: 30000
    },
    module: {
        rules: [ // loader的规则
            {
                test: /\.css/i, // 匹配所有的css文件
                // use数组里从右向左运行
                // 先用 css-loader 让webpack能够识别 css 文件的内容并打包
                // 再用 style-loader 将样式, 把css插入到dom中
                //从后向前解析
                //style-loader 放在 css-loader之前
                use: ["style-loader", "css-loader"]
            }, {
                test: /\.less$/i,
                // 使用less-loader, 让webpack处理less文件, 内置还会用less翻译less代码成css内容
                use: ["style-loader", "css-loader", 'less-loader']
            },
            {
                test: /\.(png|gif|jpeg)$/i,
                type: 'asset',
                generator: {
                    filename: 'images/[hash:6][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 2 * 1024
                    }
                }
            }, { // webpack5默认内部不认识这些文件, 所以当做静态资源直接输出即可
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash:6][ext]'
                }
            }, {
                test: /\.js$/i,
                use: ["babel-loader"]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }


        ]
    }
}