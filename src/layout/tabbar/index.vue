<template>
    <div class="tabbar">
        <!-- 顶部左侧(面包屑) -->
        <div class="tabbar_left">
            <Breadcrumb />
        </div>
        <!-- 顶部右侧(设置、用户) -->
        <div class="tabbar_right">
            <Setting />
        </div>
    </div>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue';
//name
defineOptions({
    name: "Tabbar"
})
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;

    }

    .tabbar_right {
        display: flex;
        align-items: center;
        margin-right: 20px;
    }
}
</style>