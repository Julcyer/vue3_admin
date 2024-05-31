//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoute } from './routes'
//创建路由器,创建路由实例并配置routes
const router = createRouter({
  //路由模式hash
  history: createWebHashHistory(),
  //路由映射的参数
  routes: constantRoute,
  //滚动行为
  //这段代码的作用是无论何时发生路由跳转，页面都会自动滚动到最顶部，
  //最左侧的位置。这是一种常见的用户体验（UX）设计，
  //确保用户在进入新的页面或视图时，总是从屏幕的起始位置开始阅读内容。
  //scrollBehavior方法会在每次导航时被调用
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
export default router
