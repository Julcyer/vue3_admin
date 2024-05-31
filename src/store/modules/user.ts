//创建用户相关的小仓库 modules(模块)
import { defineStore } from 'pinia'
//引入操作TOKEN(令牌)用户标识本地存储的工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入登录、获取用户信息、退出登录,这三个接口
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
//引入ts类型
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from '@/api/user/type'
//引入路由(常量路由)
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
// import { constantRoute } from '@/router/routes'
import { UserState } from './types/type'
//引入深拷贝方法
//@ts-expect-error
import cloneDeep from 'lodash/cloneDeep'
import router from '@/router'
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asnycRoute: any, routes: any) {
  //filter数组方法,对所有数组元素执行回调函数,符合的包含在新数组中
  return asnycRoute.filter((item: any) => {
    //includes,判断数组是否包含某个指定的值。
    if (routes.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        //硅谷333账号:product\trademark\attr\sku
        item.children = filterAsyncRoute(item.children, routes)
      }
      return true
    }
  })
}

//创建用户小仓库
/*
defineStore()第一个参数要求是一个独一无二的名字。第一个参数是你的应用中 Store 的唯一 ID。
你可以任意命名defineStore()`的返回值，但最好使用store的名字，同时以use开头且以Store结尾。
*/
const useUserStore = defineStore('User', {
  //小仓库存储数据地方,
  // state:一个返回初始状态的函数,UserState:定义state返回值类型(类型推理)
  state: (): UserState => {
  // state: () => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组(路由)
      username: '',
      avatar: '',
      // 按钮权限
      buttons: [],
    }
  },
  //异步|逻辑的地方
  //Action相当于组件中的method,定义业务逻辑的完美选择。可通过this访问整个store实例
  actions: {
    //用户登录的方法,异步
    async userLogin(data: loginFormData) {
      //登录请求,调用api中reqLogin进行处理
      // const result: any = await reqLogin(data)
      const result: loginResponseData = await reqLogin(data)
      //登录请求:成功200->token
      //登录请求:失败201->登录失败错误的信息
      if (result.code == 200) {
        //pinia仓库存储一下token
        //由于pinia|vuex存储数据其实利用js对象
        this.token = result.data as string
        //本地存储token(持久化存储一份)
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息方法
    async userInfo() {
      //获取用户信息进行存储仓库当中[用户头像、名字]
      const result: userInfoReponseData = await reqUserInfo()
      //如果获取用户信息成功，存储一下用户信息
      if (result.code == 200) {
        // // **mock**
        // this.username = result.data.username as string
        // **真实接口**
        this.username = result.data.name

        this.avatar = result.data.avatar
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(cloneDeep(asnycRoute), result.data.routes);
        // const userAsyncRoute = filterAsyncRoute(asnycRoute, result.data.routes,);
        //菜单需要的数据整理完毕
        this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute];
        //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
        [...userAsyncRoute, anyRoute].forEach((route: any) => {
          router.addRoute(route);
        })
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      //退出登录请求
      const result: any = await reqLogout()
      if (result.code == 200) {
        //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})
//对外暴露获取小仓库方法
export default useUserStore
