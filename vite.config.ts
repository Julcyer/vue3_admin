// https://vitejs.dev/config/ vite官网
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
/* src别名的配置(vite.config.ts和tsconfig.json)
   导入Node.js的path模块配置别名,需要安装@types/node包,pnpm add --save-dev @types/node */
import path from 'path'
// 导入SVG图标配置(vite.config.ts与main.ts)(pnpm install vite-plugin-svg-icons -D)
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// mock数据(pnpm install -D vite-plugin-mock mockjs),vite-plugin-mock在开发环境中模拟API请求,mockjs生成随机数据,拦截Ajax请求的Mock库
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(({ command, mode }) => {
  /*
  获取各种环境下的对应的变量.loadEnv用于加载项目中的环境变量
  (mode项目的环境(开发、测试、生产),process.cwd()返回当前工作目录的路径)
  */
  let env = loadEnv(mode, process.cwd());
  return {
    // 打包的相对路径
    base: './',
    plugins: [vue(),
    //配置SVG图标
    createSvgIconsPlugin({
      // 指定要缓存的图标文件夹(Specify the icon folder to be cached)
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式(Specify symbolId format)
      symbolId: 'icon-[dir]-[name]',
    }),
    //配置mock
    viteMockServe({
      enable: command === 'serve',    //保证开发阶段可以使用mock接口
    })
    ],
    //代理跨域
    server: {
      proxy: {
        //es6方括号语法,动态属性
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置,代理目标服务器的地址 target(目标)
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写,根据真实接口修改路径,这里移除/api
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
      }
    },
    // 集成sass (src/styles/index.scss与main.ts与vite.config.ts)
    // 给项目中引入全局变量$,让全局样式文件中可以使用$变量
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          //additionalData: 此选项允许您为所有Sass文件添加额外的导入语句或样式。
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
  }
})
