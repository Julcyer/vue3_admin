//TOKEN(令牌)用户标识操作的方法集成(封装)
//封装本地存储存储数据与读取数据方法
/*
localStorage（本地存储）是Web浏览器提供的一种机制，允许网站存储信息在用户的计算机上。
浏览器关闭后，数据仍保留，直到被显式清除或者到达存储的有效期限。
*/
//存储
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
//获取
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
//删除
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
