module.exports = {
  lintOnSave: false,
  publicPath: "/statics/dist",
  devServer: {

    proxy: {

      '/api': {

        target: 'https://wxp.sharkmeida.cn', //对应服务器地址

        changeOrigin: true, //允许跨域

        ws: true,

        pathRewrite: {

          '^/api': ''

        }

      }

    }

  }
}