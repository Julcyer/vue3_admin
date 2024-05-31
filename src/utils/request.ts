//axios二次封装(pnpm install axios)
import axios from "axios";
//引入弹窗UI,ElMessage
import { ElMessage } from "element-plus";
//引入用户相关的仓库
import useUserStore from '@/store/modules/user'
//create用于创建一个拥有自定义配置的新Axios实例,
let request = axios.create({
    //使用axios.create时，你可以指定一些默认配置
    baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
    timeout: 5000   //超时的时间
})
//请求拦截器,会在请求发送到服务器之前执行
request.interceptors.request.use(config => {
    //在发送请求之前做些什么

    //获取用户相关的小仓库:获取仓库内部token,登录成功以后携带给服务器
    const userStore = useUserStore()
    if (userStore.token) {
        config.headers.token = userStore.token
    }
    //config配置对象,headers属性请求头,经常给服务器端携带公共参数
    //返回配置对象
    return config;
});
//响应拦截器,会在请求从服务器返回之前执行
request.interceptors.response.use((response) => {
    //2xx 范围内的状态码都会触发该函数。
    //对响应数据做点什么
    return response.data;
},
    (error) => {
        //超出 2xx 范围的状态码都会触发该函数。
        //对响应错误做点什么
        //处理网络错误
        let msg = '';
        let status = error.response.status;
        switch (status) {
            case 401:
                msg = "token过期";
                break;
            case 403:
                msg = '无权访问';
                break;
            case 404:
                msg = "请求地址错误";
                break;
            case 500:
                msg = "服务器出现问题";
                break;
            default:
                msg = "无网络";
        }
        ElMessage({
            type: 'error',
            message: msg
        })
        return Promise.reject(error);
    });
//对外暴露Axios实例
export default request;