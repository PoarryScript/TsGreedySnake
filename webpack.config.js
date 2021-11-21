//引入包
const path = require("path");

//引入插件，用来生成html文件，避免在编译之后手动添加编译结果到html文件
const HtmlWebPackPlugin = require("html-webpack-plugin");
//clean 插件，编译输出前清空之前编译文件，避免缓存引起的问题
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//webpack所有配置信息都写在此
module.exports = {

    //入口文件
    entry: "./src/index.ts",
    //指定打包文件输出路径
    output: {
        //指定输出的目录
        path: path.resolve(__dirname, 'dist'),
        //打包后的文件名
        filename: "bundle.js",
        //配置webpack 不使用箭头函数，兼容ie
        environment: {
            arrowFunction: false
        }

    },
    mode: "development",
    //webpack打包时候用到的module  不同模块需要的规则和loader
    module: {

        //指定加载的规则
        rules: [{ //对哪些文件生效（正则表示匹配的文件）
                test: /\.ts$/,
                use: [{
                        //配置babel
                        //指定加载器
                        loader: 'babel-loader',
                        options: {
                            //设置预定义环境
                            presets: [
                                [ //环境插件
                                    "@babel/preset-env",
                                    {
                                        //配置信息  要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88",
                                            "ie": "11"
                                        },
                                        //指定core-js的版本
                                        "corejs": "3",
                                        "useBuiltIns": "usage", //使用core-js的方式 usage 按需加载
                                    }
                                ],
                            ],
                        },

                    },
                    'ts-loader',
                    //执行顺序是从后往前执行  先用ts-loader将ts转化为js 在用babel-loader将js转化为旧版js
                ],
                //要排除的文件
                exclude: /node-modules/,

            },
            {
                //设置less文件的处理
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        //引入postcss-loader
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions', //兼容每个浏览器的最新的两个版本
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader",
                ],
            },

        ]
    },

    //配置webpack插件
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        new HtmlWebPackPlugin({
            //可以传入网页的配置
            // template: "./src/temple.html" //网页模版，用于统一的样式
        }), //自动生成html文件并且引入相关的资源
    ],
    //用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js'], //以ts js结尾的文件都可以作为模块进行引用
    }

}