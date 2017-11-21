// 导入html-webpack-plugin 包,获取到插件对象
var htmlwp = require('html-webpack-plugin');
// 导出一个对象
module.exports = {
    entry: './src/main.js', //项目入口文件
    output: { //输入
        path: __dirname + '/dist', //打包后的文件放到哪一个目录，必须是个绝对目录
        filename: 'build.js' //打包之后生成的文件名
    },
    module: { //打包css需要添加配置 moudle 选项
        loaders: [{ //匹配所有的css文件
                test: /\.css$/,
                loader: 'style-loader!css-loader'
                //顺序不能错 
            },
            {
                test: /\.scss$/, //打包 .scss文件
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.less/, //打包 .less文件
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg)$/, //打包url请求的资源文件
                loader: 'url-loader?limit=20000' //limit表示图片的大小为20K是临界值，小于20K的图片均被打包到build.js中去，请求图片就会很快
            },
            {
                test:/\.vue$/,  //解析 .vue组件页面文件
                loader:'vue-loader'
            }
        ]
    },
    plugins: [
        new htmlwp({
            title: '首页', //生成的页面标题
            filename: 'index.html', //webpack-dev-server在内存中生成的文件名称，自动将build注入到这个页面底部，才能实现自动刷新功能
            template: 'index1.html' //根据index1.html这个模板来生成(这个文件请程序员自己生成)
        })
    ]   
}