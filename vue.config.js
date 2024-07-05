const path = require('path')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/', //这个配置项在大多数情况下是必须的，特别是当你的应用被部署在非根路径下时，比如 /my-app/。
    lintOnSave: false, // true 时，在开发过程中每次保存文件时，ESLint 将会自动检查你的代码
    outputDir: 'dist', //指定打包后的文件输出目录
    assetsDir: 'static', //指定放置生成的静态资源（js、css、img、fonts 等）的目录
    indexPath: 'index.html', //指定生成的 index.html 文件的输出路径。
    productionSourceMap: false, //当生产环境出现问题需要调试时，可以通过 source map 追踪到源代码的位置，有助于快速定位问题所在。但同时也会增加构建后的文件大小和打包时间。
    devServer: {
        port: 8086, //指定开发服务器的端口号。.env.development优先级更高
        host: '0.0.0.0', //'localhost' 指定开发服务器绑定的主机地址。
        open: true, //是否在开发服务器启动时自动打开浏览器
        proxy: {
            '/dev': {
                target: 'http://192.168.3.152:10110',
                changeOrigin: true, //用于控制代理服务器是否修改请求的 Origin 字段，以确保目标服务器正确处理跨域请求。
                pathRewrite: {
                    '^/dev': '',
                },
            },
        },
    },
    chainWebpack: (config) => {
        // 设置 @ 符号代表 src 目录
        config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
        // 修改 html-webpack-plugin 的标题
        config.plugin('html').tap((args) => {
            args[0].title = '项目标题'
            return args
        })
    },
}
