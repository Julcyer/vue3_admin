//API接口统一管理,定义用户相关数据的ts类型
//登录表单数据,用户登录接口携带参数的ts类型
export interface loginFormData {
    username: string
    password: string
}
//响应数据,定义全部接口返回数据都拥有ts类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
    data: string
}
//定义获取用户信息返回数据类型
export interface userInfoReponseData extends ResponseData {
    data: {
        // username是mock接口的
        username?: string
        routes: string[]
        buttons: string[]
        roles: string[]
        name: string
        avatar: string
    }
}
