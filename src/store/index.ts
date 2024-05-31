//pinia仓库
//
//创建一个pinia实例(大仓库)(根store)，使整个应用都能够访问到定义的stores。
import { createPinia } from 'pinia'
const pinia = createPinia()
//对外暴露给入口文件main.ts安装仓库
export default pinia

// Store是一个保存：状态、业务逻辑 的实体，每个组件都可以读取、写入它。