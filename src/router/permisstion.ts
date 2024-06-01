//路由鉴权:鉴权,项目当中路由能不能被访问的权限的设置(某一个路由什么条件下可以访问、什么条件下不可以访问)
//引入路由实例router
import router from '@/router'
//引入项目标题配置,动态设置网页标题
import setting from '@/setting'
// //@ts-ignore会忽略当前行的类型检查
// 引入进度条插件及其样式,可在样式中修改进度条颜色
//@ts-ignore
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//去掉进度条加载圈
nprogress.configure({ showSpinner: false })
//获取用户相关的小仓库内部token数据,去判断用户是否登录成功
import useUserStore from '@/store/modules/user'
//在组件外部,需要获取大仓库才能使用小仓库
import pinia from '@/store'
const userStore = useUserStore(pinia)
//vue router中的全局守卫(导航守卫):项目当中任意路由切换都会触发的钩子
//全局前置守卫,to:你将要访问那个路由,from:你从来个路由而来(_:js占位符,表示变量没实际使用),next:路由的放行函数
router.beforeEach(async (to, _from, next) => {
  //获取token,去判断用户登录、还是未登录
  const token = userStore.token
  //获取用户名字,用于判断是否有用户信息
  const username = userStore.username
  //用户登录判断
  if (token) {
    //登录成功,访问login,不能访问,指向首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //登录成功访问其余六个路由(登录排除)
      //有用户信息
      if (username) {
        //放行
        next()
      } else {
        //如果没有用户信息,在守卫这里发请求获取到了用户信息再放行
        try {
          //获取用户信息
          await userStore.userInfo()
          //放行
          //万一:刷新的时候是异步路由,有可能获取到用户信息、异步路由还没有加载完毕,出现空白的效果
          next({ ...to })
        } catch (error) {
          //token过期:获取不到用户信息了
          //用户手动修改本地存储token
          //退出登录->用户相关的数据清空
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录判断。访问登录页:放行,其他页面:不放行,回到登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
  // 动态设置网页标题
  document.title = `${setting.title} - ${to.meta.title}`
  // 进度条开始
  nprogress.start()
})
//全局后置守卫,_:js占位符,表示变量没实际使用
router.afterEach((_to: any, _from: any) => {
  // 进度条消失
  nprogress.done()
})

//第一个问题:任意路由切换实现进度条业务 ---nprogress
//第二个问题:路由鉴权(路由组件访问权限的设置)
//全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)

//用户未登录:可以访问login,其余六个路由不能访问(指向login)
//用户登录成功:不可以访问login[指向首页],其余的路由可以访问
