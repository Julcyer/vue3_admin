//API接口统一管理(src/api)项目用户相关的接口
import request from '@/utils/request'
//引入ts类型
import type { loginFormData, loginResponseData, userInfoReponseData } from './type'
//枚举API项目用户相关的请求地址
enum API {
    // //mock中的接口
    // LOGIN_URL = '/user/login',
    // USERINFO_URL = '/user/info',
    // LOGOUT_URL = '/user/logout',
    //尚硅谷的服务器的接口
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}
//使用二次封装的axios实例request进行处理
//登录请求函数,date:登录表单数据
export const reqLogin = (data: loginFormData) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)
//请求(获取)用户信息
export const reqUserInfo = () =>
    request.get<any, userInfoReponseData>(API.USERINFO_URL)
//退出登录请求
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)