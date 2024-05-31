//小仓库:layout组件相关配置仓库 setting(设置)
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('Setting', {
  state: () => {
    return {
      fold: false, //用户控制菜单折叠还是收起控制
      refsh: false, //仓库这个属性用于控制刷新效果
    }
  },
})

export default useLayOutSettingStore
