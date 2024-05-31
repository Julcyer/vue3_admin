<template>
    <!-- 路由组件出口的位置 结构赋值Component-->
    <router-view v-slot="{ Component }">
        <!-- transition vue动画 fade(淡入)-->
        <transition name="fade">
            <!-- 渲染layout一级路由组件的子路由 -->
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from 'vue';
//layout组件相关配置仓库获取refsh控制刷新
import useLayOutSettingStore from '@/store/modules/setting';
let layOutSettingStore = useLayOutSettingStore();

//控制当前组件是否销毁重建(刷新)
let flag = ref(true);
//监听仓库内部数据是否发生变化,如果发生变化,说明用户点击过刷新按钮(MC侦测器？)
watch(() => layOutSettingStore.refsh, () => {
    //点击刷新按钮:路由组件销毁
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
})
//name
defineOptions({
    name: "Main"
})
</script>

<style scoped>
/* 进入动画的起始状态 */
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

/* 进入动画的生效状态 */
.fade-enter-active {
    transition: all .3s;
}

/* 进入动画的结束状态 */
.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>

<!-- 
<router-view>:这是Vue Router的一个内置组件,它用于渲染当前路由匹配的组件。
v-slot="{Component}":这是Vue.js的插槽API,用于接收<router-view>传递下来的插槽prop。
{Component}是一个解构赋值的语法,它从<router-view>接收到的插槽prop
中解构出一个名为Component的变量,这个变量就是即将被渲染的路由组件。在v-slot="{Component}"之后,
我们可以添加任何我们想要在路由组件渲染前执行的逻辑,比如条件渲染、过渡效果、包裹其他元素等
-->