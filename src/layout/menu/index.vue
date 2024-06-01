<!-- 递归生成菜单 -->
<template>
    <template v-for="(item, _index) in menuList" :key="item.path">
        <!--没有子路由-->
        <template v-if="!item.children">
            <!-- index:唯一标志,在这里同时用作存储路径 -->
            <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
                <el-icon>
                    <!-- component一个用于渲染动态组件或元素的“元组件”,
                        element-plus图标组件在components中全局注册后不用导入 -->
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由但是只有一个子路由 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden" @click="goRoute">
                <el-icon>
                    <component :is="item.children[0].meta.icon"></component>
                </el-icon>
                <template #title>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>
        <!-- 有子路由且个数大于一个1 el-sub-menu用于在Vue应用中创建下拉菜单 sub(子)-->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <!-- 标题 -->
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归调用 -->
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
// useRouter(使用路由器)返回路由器实例,包含路由器的状态和方法，例如导航、匹配、重定向等。
import { useRouter } from 'vue-router';
//获取父组件传递过来的全部路由数组
defineProps(['menuList']);

//获取路由器对象
let $router = useRouter();
//点击菜单的回调
const goRoute = (vc: any) => {
    //路由跳转
    $router.push(vc.index);
}
//显示定义name,用于递归等
defineOptions({
    name: 'Menu'
})
</script>

<style scoped></style>