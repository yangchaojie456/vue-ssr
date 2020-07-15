const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    const [percentModules, active, filePath] = [...args];
    const percent = `${parseInt(percentage * 100)}% ${message ||
        ""} ${percentModules || ""} ${active || ""} ${(filePath &&
            "..." + filePath.slice(-37)) ||
        ""}`;    
    console.info(percent);
};
module.exports = {

    // 别名 配置   不然知不道 import 的vue 路径
    resolve: { alias: { 'vue': 'vue/dist/vue.js' } },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.vue$/, use: 'vue-loader' }]
    },

    plugins: [
        new webpack.ProgressPlugin(handler),
        // 不加 解析不出来 vue组件
        new VueLoaderPlugin(),
    ]
}
