//directive(指令、命令)
import pinia from '@/store'
import useUserStore from '@/store/modules/user'
const userStore = useUserStore(pinia)
export const hasButton = (app:any) => {
    //获取对应的用户仓库
    //全局自定义指令:实现按钮的权限
    //directive,vue自定义指令
    app.directive('btn', {
        //代表使用这个全局自定义指令的DOM|组件挂载完毕的时候会执行一次
        //mounted,自定义指令生命周期钩子,指令绑定的元素或组件挂载到DOM时执行
        mounted(el:any, options:any) {
            //自定义指令右侧的数值:如果在用户信息buttons数组当中没有
            //includes,判断数组是否包含某个指定的值
            if (!userStore.buttons.includes(options.value))
                //parentNode,指向元素的父节点,removeChild移除一个子节点
                el.parentNode.removeChild(el)
        },
    })
}