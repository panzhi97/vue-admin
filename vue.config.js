const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const Icons = require('unplugin-icons/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,          // 关闭eslint
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件 关掉

  devServer: {
    open: false,      // 编译完成是否打开网页
    host:'0.0.0.0',   // 指定使用地址 默认localhost 0.0.0.0代表可以被外界访问
    port: 7070,       // 访问端口
    proxy: {
      "/api": {
        target: 'http://127.0.0.1:5000',   // 本地测试
        ws: true,
        changeOrigin: true,
        secure: false,                     //如果是https接口，需要配置这个参数
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },

  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),                            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          IconsResolver({ prefix: 'Icon' })                 // 自动导入图标组件
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),                            // 自动导入 Element Plus 组件
          IconsResolver({ enabledCollections: ['ep'] })     // 自动注册图标组件 <i-ep-add-location />
        ],
      }),
      Icons({
        scale: 1,             // 缩放倍数
        compiler: 'vue3',     // 编译方式
        autoInstall: true
      }),
    ]
  }
})
