module.exports = {
    root: true, //表示 ESLint 将会停止在父级目录中查找配置文件。这意味着该配置文件是根目录下的顶级配置文件。
    env: {
        node: true, //指定代码的运行环境为 Node.js 环境，这样 ESLint 就会识别 Node.js 中的全局变量。
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
    // plugin:vue/essential: 启用了 Vue.js 官方的 ESLint 插件，提供了 Vue.js 项目必要的检查规则。
    // eslint:recommended: 启用了 ESLint 推荐的基本规则，覆盖了一些通用的最佳实践。
    // @vue/prettier: 整合了 Prettier 的格式化规则，确保代码风格一致性。
    parserOptions: {
        parser: 'babel-eslint', //指定了解析器为 babel-eslint，这是一个兼容 Babel 解析器的 ESLint 解析器。
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
}
