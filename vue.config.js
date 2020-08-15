const resolve = (dir) => require("path").join(__dirname, dir);
const path = require("path");

module.exports = {
  publicPath: "./",
  devServer: {
    port: "8080", // 代理端口
    open: true, // 项目启动时是否自动打开浏览器
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      "/api": {
        // 代理api
        target: "http://localhost:3000", // 服务器api地址
        changeOrigin: true, // 是否跨域
      },
    },
  },
  chainWebpack: (config) => {
    // 1、项目中默认svg加在rule排除掉icons/svg
    config.module.rule("svg").exclude.add(resolve("src/icons"));

    // 2、svg-loader配置
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
};
