<template>
    <!-- 功能、设置 -->
    <!-- 按钮 circle:是否为圆形按钮 -->
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <!-- Popover(弹出式)气泡卡片 placement:出现位置 trigger:触发方式 hover(悬停)-->
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
        <!-- 表单元素 inline,表单在一行-->
        <el-form inline>
            <el-form-item label="主题颜色">
                <!-- ColorPicker颜色选择器 show-alpha:透明度选择 predefine:预定义颜色 
                    teleported:是否将popover的下拉列表渲染至body下,false会触发元素附近渲染,鼠标在颜色选择器上时卡片不会消失 -->
                <el-color-picker @change="setColor" v-model="color" size="small" show-alpha :predefine="predefineColors"
                    :teleported="false" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <!-- Switch开关  inline-prompt设置图标或文字是否在按钮内 
                    active-icon开启的图标设置此项会忽略active-text 
                    inactive-icon关闭的图标设置此项会忽略inactive-text-->
                <el-switch @change="changeDark" v-model="dark" inline-prompt active-icon="MoonNight"
                    inactive-icon="Sunny" />
            </el-form-item>
        </el-form>
        <!-- 通常我们使用#reference来放置我们的触发元素 circle:是否为圆形按钮-->
        <template #reference>
            <el-button size="small" icon="Setting" circle></el-button>
        </template>
    </el-popover>
    <!-- 用户 -->
    <img :src="userStore.avatar" style="width: 30px;height: 30px;margin:0px 10px;border-radius: 50%;">
    <!-- Dropdown下拉菜单 -->
    <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <!-- element-plus图标组件 -->
                <arrow-down />
            </el-icon>
        </span>
        <!-- <template #dropdown>是一个插槽 v-slot简写# 将插槽的内容插入到<el-dropdown>组件的dropdown插槽位置,即下拉菜单的菜单项部分 -->
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router';
//获取用户相关的小仓库,用来退出登录
import useUserStore from '@/store/modules/user';
//获取骨架的小仓库,layout组件相关配置仓库,包含refsh属性控制刷新效果
import useLayOutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayOutSettingStore();
let userStore = useUserStore();
//获取路由器对象
let $router = useRouter();
//获取路由对象
let $route = useRoute();
//收集开关的数据,黑夜模式开关
let dark = ref();
//刷新按钮点击回调
const updateRefsh = () => {
    layoutSettingStore.refsh = !layoutSettingStore.refsh;
};
//全屏按钮点击的回调
const fullScreen = () => {
    //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
    let full = document.fullscreenElement;
    //切换为全屏模式
    if (!full) {
        //文档根节点的方法requestFullscreen,实现全屏模式
        document.documentElement.requestFullscreen();
    } else {
        //变为不是全屏模式->退出全屏模式
        document.exitFullscreen();
    }
}
//退出登录点击回调
const logout = async () => {
    //第一件事情:需要向服务器发请求[退出登录接口]******
    //第二件事情:仓库当中关于用于相关的数据清空[token|username|avatar]
    //第三件事情:跳转到登录页面
    await userStore.userLogout();
    //跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } });

}

//颜色组件组件的数据 color、predefineColors(预定义颜色)
const color = ref()
const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

//切换暗黑模式
//element-plus暗黑模式(当html上有类名dark时为暗黑模式,需要在main.ts引入el的css)
const changeDark = () => {
    localStorage.setItem('dark', dark.value as string)
    //获取HTML根节点
    let html = document.documentElement;
    //判断HTML标签是否有类名dark
    dark.value ? html.className = 'dark' : html.className = '';
}

//主题颜色的设置
const setColor = () => {
    //存储在本地
    localStorage.setItem('color', color.value)
    //通知js修改根节点的样式对象的属性与属性值
    const html = document.documentElement;
    html.style.setProperty('--el-color-primary', color.value);
}

// 初始化暗黑模式状态和主题色
onMounted(() => {
    // 初始化主题色
    color.value = localStorage.getItem('color')
    // 存储的为清空的主题色，则设置为默认主题色
    if (localStorage.getItem('color') === 'null' || !localStorage.getItem('color')) {
        color.value = 'rgba(30, 144, 255, 1)';
        localStorage.setItem('color', color.value)
    }
    // 进行初始化赋值
    const html = document.documentElement
    html.style.setProperty('--el-color-primary', color.value)
    // 初始化暗黑模式
    if (localStorage.getItem('dark')) {
        dark.value = localStorage.getItem('dark') === 'true'
        let html = document.documentElement
        dark.value ? html.className = 'dark' : html.className = ''
    } else dark.value = false
})

//name
defineOptions({
    name: "Setting"
})
</script>

<style scoped>
.dropdown {
    cursor: pointer;
}
</style>