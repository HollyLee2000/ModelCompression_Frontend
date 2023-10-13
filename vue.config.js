const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack")
module.exports = defineConfig({
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: false,
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api': {
        target: 'http://10.214.242.155:7996',  //部署的时候, 记得更改服务器上的后端端口
        //target: 'http://localhost:8888',
        changeOrigin:true,
        pathRewrite:{'^/api':''},
      }}
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'DepGraph | Towards Any Structural Pruning'
    }
  },
  //lch测试
  //hl测试
  //以下都是和bootstrap以及bootstrap vue相关的配置
  // configureWebpack: {
  //   plugins: [
  //     // 配置 jQuery 插件的参数
  //     image webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       'window.jQuery': 'jquery',
  //       Popper: ['popper.js', 'default']
  //     })
  //   ],
  //   resolve: {
  //     alias: {
  //       'vue': '@vue/compat',
  //     },
  //   }
  // },

  // chainWebpack: config => {
  //   config.module
  //       .rule('vue')
  //       .use('vue-loader')
  //       .tap(options => {
  //         return {
  //           ...options,
  //           compilerOptions: {
  //             compatConfig: {
  //               MODE: 3,
  //             },
  //           },
  //         }
  //       })
  // },
})

// holy
// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// module.exports = { configureWebpack: {
//     resolve: {
//       extensions: [".ts", ".tsx", ".js", ".json"],
//       alias: {}
//     },
//     module: {
//       rules: [
//         {
//           test: /\.tsx?$/,
//           loader: 'ts-loader',
//           exclude: /node_modules/,
//           options: {
//             appendTsSuffixTo: [/\.vue$/],
//           }
//         }
//       ]
//     }
//   }
// }