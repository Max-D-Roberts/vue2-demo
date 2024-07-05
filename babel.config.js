module.exports = {
    presets: ['@vue/cli-plugin-babel/preset'],
}

/* 
babel.config.js文件是什么用途?
----
babel.config.js 文件是用于配置 Babel 的 JavaScript 文件。
它的作用是定义项目中 Babel 的配置选项和插件预设，以便在项目中使用 ECMAScript 新特性、转换 JSX、处理 TypeScript 等。

presets: ["@vue/cli-plugin-babel/preset"]：
----
在 Babel 的配置中，presets 用于指定一组预设，预设是一组插件的集合，它们共同完成对特定类型语法的转换。
在这个示例中，["@vue/cli-plugin-babel/preset"] 是指使用 Vue CLI 官方提供的 Babel 预设。
这个预设包含了一系列的 Babel 插件，用于支持 Vue.js 的特性和语法，
例如处理 Vue 单文件组件中的 <template>、<script> 和 <style> 部分，以及其他与 Vue 开发相关的语法转换。
综合起来，这段配置的含义是告诉 Babel 使用 Vue CLI 提供的官方预设，以便正确地转换和处理 Vue.js 项目中的 JavaScript 代码。
*/
