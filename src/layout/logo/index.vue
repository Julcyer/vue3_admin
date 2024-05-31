<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="Logo">
        <Transition name="title">
            <p v-show="!settingStore.fold" v-if="titleShow">{{ setting.title }}</p>
        </Transition>
    </div>
</template>

<script setup lang="ts">
//引入设置标题与logo这配置文件
import setting from '@/setting';
import useSettingStore from '@/store/modules/setting'
import { onMounted, ref } from 'vue';
let settingStore = useSettingStore()

let titleShow = ref<boolean>(true);
//change(改变/调整)show(显示)
const changeShow = () => {
    if (window.innerWidth > 1400) {
        settingStore.fold = false
        titleShow.value = true
    } else if (window.innerWidth > 1300) {
        settingStore.fold = false
        titleShow.value = true
    } else if (window.innerWidth > 800) {
        settingStore.fold = false
        titleShow.value = false
    } else {
        settingStore.fold = true
        titleShow.value = false
    }
}
window.addEventListener('resize', changeShow);
onMounted(changeShow)
//组件name
defineOptions({
    name: "Logo"
})
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    align-items: center;
    display: flex;
    justify-content: space-evenly;

    img {
        max-width: 40px;
        max-height: 40px;
        height: 100%;
        border-radius: 10%;
        transition: opacity 0.3s;
    }

    p {
        min-width: 200px;
        color: white;
        font-weight: bold;
        font-size: $base-logo-title-fontSize;
        white-space: nowrap;
        transition: opacity 0.3s;
    }

    .title-enter-from {
        opacity: 0;
    }

    .title-enter-to {
        opacity: 1;
    }

    .title-leave-from {
        opacity: 1;
    }

    .title-leave-to {
        opacity: 0;
    }
}
</style>