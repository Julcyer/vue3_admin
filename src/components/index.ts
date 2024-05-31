// 用于注册components文件夹内部全部全局组件,并在main.ts中引入安装
import SvgIcon from './SvgIcon/index.vue';
import Category from './Category/index.vue'
import type { App, Component } from 'vue';  //导入类型，用于TypeScript的类型注解
//引入element-plus提供全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const components: { [name: string]: Component } = { SvgIcon , Category};
export default {
    install(app: App) {
        // 使用Object.keys函数遍历对象的所有组件名，然后使用app.component方法将每个组件注册到Vue应用中
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
        //将element-plus提供图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
        }
    }
}