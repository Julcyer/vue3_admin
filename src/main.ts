//入口文件main.ts
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)
//集成sass,引入,供全局使用。(src/styles/index.scss与main.ts与vite.config.ts)
import './styles/index.scss'
//安装element-plus,设置默认支持语言为中文
import  ElementPlus  from "element-plus";
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
    locale: zhCn
})
//element-plus暗黑模式需要的样式(当html上有类名dark时为暗黑模式)
import 'element-plus/theme-chalk/dark/css-vars.css'
//导入SVG图标配置(vite.config.ts与main.ts)
import 'virtual:svg-icons-register'
//在入口文件引入components/index.ts文件,通过app.use方法安装自定义插件
import gloablComponent from './components/index';
app.use(gloablComponent);
//路由
import router from './router'
app.use(router);
//引入路由鉴权文件
import './router/permisstion'
//引入仓库,安装仓库,安装完后可以使用所有store
import pinia from './store'
app.use(pinia);
//引入自定义指令文件
import { hasButton } from '@/directive/btn.ts'
hasButton(app)

app.mount('#app')
