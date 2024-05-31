<template>
    <!-- container(容器) -->
    <div class="layout_container">
        <!-- 左侧菜单 slider(滑块)-->
        <div class="layout_slider" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <!-- 滚动组件 scrollbar(滚动条)-->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 menu(菜单)
                     :collapse垂直导航菜单折叠(true折叠) 
                     LayOutSettingStore:layout配置仓库
                     default-active:页面加载时默认激活的路由
                     active-text-color菜单激活时字体颜色-->
                <el-menu :collapse="LayOutSettingStore.fold ? true : false" :default-active="$route.path"
                    class="el-menu"  background-color="#001529" text-color="white">
                    <!--根据路由动态生成菜单 用:menuList传递路由数组-->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 tabbar(标签栏)-->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <!-- layout组件的顶部导航tabbar -->
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区域 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
//获取路由对象 useRoute(使用路由)返回路由信息的对象,包含当前路由信息包括路径、查询参数、路由对象等
import { useRoute } from 'vue-router'
//引入左侧菜单logo子组件
import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//右侧内容展示区域
import Main from './main/index.vue';
//引入顶部tabbar组件
import Tabbar from './tabbar/index.vue';
//获取用户相关的小仓库
import useUserStore from '@/store/modules/user';
//获取layout配置仓库,包含fold:控制菜单折叠还是收起控制,refsh:控制刷新效果
import useLayOutSettingStore from '@/store/modules/setting';
let userStore = useUserStore();
let LayOutSettingStore = useLayOutSettingStore();
//获取路由对象
let $route = useRoute();
// (显示)命名name
// defineOptions()可以用来直接在<script setup>中声明组件选项,而不必使用单独的<script>块,仅支持Vue 3.3+
defineOptions({
    name: "Layout"
})
</script>

<style scoped lang="scss">
.layout_container {
    //width: 100%;
    height: 100vh;

    .layout_slider {
        color: white;
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        transition: all 0.3s;

        &.fold {
            width: $base-menu-min-width;
        }

        .scrollbar {
            //width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            overflow: auto;

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;

        /* 在Scss中,&代表父选择器的引用。这里的意思是,这个样式规则将应用于任何带有fold类的父选择器.layout_tabbar。
        例如,如果一个元素有类layout_tabbar fold,那么这些样式将应用到这个元素上。*/
        &.fold {
            width: calc(100% - $base-menu-min-width );
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        /* 在Scss中,&代表父选择器的引用*/
        &.fold {
            width: calc(100% - $base-menu-min-width );
            left: $base-menu-min-width;
        }

    }
}
</style>