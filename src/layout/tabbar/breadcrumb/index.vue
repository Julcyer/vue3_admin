<template>
    <!-- 顶部左侧静态 -->
    <!-- 左侧菜单折叠 -->
    <el-icon style="margin-right:10px" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 separator-icon图标分隔符-->
    <el-breadcrumb separator-icon="ArrowRight">
        <!-- 面包动态展示路由名字与标题 $route.matched包含当前路由的详细信息 to:路由跳转目标-->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <!-- 图标 -->
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <!-- 面包屑展示匹配路由的标题 -->
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
// useRoute(使用路由)返回路由信息的对象,包含当前路由信息包括路径、查询参数、路由对象等
import { useRoute } from 'vue-router';
import useLayOutSettingStore from '@/store/modules/setting';
//获取layout配置相关的仓库
let LayOutSettingStore = useLayOutSettingStore();
//获取路由对象
let $route = useRoute();
//点击图标的方法
const changeIcon = () => {
    //图标进行切换
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}
//name
defineOptions({
    name: "Breadcrumb"
})
</script>

<style scoped></style>