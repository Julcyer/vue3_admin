<template>
  <div class="login_container">
    <!-- el-row和el-col:Layout布局,24分栏。span,栅格占据的列数、xs,网页小于768px时栅格占据的列数-->
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <!-- 登录的表单 -->
        <!-- model绑定表单的数据源、rules绑定表单的验证规则、ref创建一个对el-form的引用 -->
        <!-- <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms"> -->
        <el-form class="login_form" :model="loginForm" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到某某商城</h2>
          <!-- prop属性的值应该与:model绑定的对象中的属性名相匹配,这样，Element UI知道如何将这个表单项的值与对应的验证规则关联起来。-->
          <el-form-item prop="username">
            <!-- prefix-icon添加一个前缀图标 -->
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- prefix-icon添加一个前缀图标 show-password切换密码的显示状态-->
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <!-- loading,指定按钮是否处于加载状态 type="primary"设置为主要按钮样式 size="default",默认大小medium(中等)-->
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
//导入Element Plus图标库中的图标组件和通知组件到当前的Vue组件中
import { User, Lock } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { ref, reactive } from "vue";
//引入获取当前时间的函数
import { getTime } from '@/utils/time';
// 引入Vue Router,
// useRouter(使用路由器)返回路由器实例,包含路由器的状态和方法，例如导航、匹配、重定向等。
// useRoute(使用路由)返回路由信息的对象,包含当前路由信息包括路径、查询参数、路由对象等
import { useRouter, useRoute } from 'vue-router';
//引入用户相关的小仓库
import useUserStore from "@/store/modules/user";
let useStore = useUserStore();
//获取路由器
let $router = useRouter();
//路由对象
let $route = useRoute();
//loading控制按钮加载效果
let loading = ref(false);
//获取el-form组件
let loginForms = ref();
//表单的账号和密码
let loginForm = reactive({ username: 'admin', password: '111111' });

//发送表单进行登录
const login = async () => {
  //保证全部表单相校验通过再发请求
  //validate对整个表单的内容进行验证,是el-form的方法,通过继续执行,失败显示错误信息
  await loginForms.value.validate();
  //加载效果:开始加载
  loading.value = true;
  //点击登录按钮以后干什么?
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出登录失败信息
  try {
    //保证登录成功,调用仓库中userLogin方法处理登录请求
    await useStore.userLogin(loginForm);
    //编程式导航跳转到展示数据首页
    //判断登录的时候,路由路径当中是否有query参数,如果有就往query参数挑战,没有跳转到首页,query指的是URL中的查询参数部分
    let redirect: any = $route.query.redirect;
    $router.push({ path: redirect || '/' });
    //登录成功提示信息
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: `HI,${getTime()}好`
    });
    //登录成功加载效果也消失
    loading.value = false;
  } catch (error: any) {
    //登录失败加载效果消失
    loading.value = false;
    //登录失败的提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  }
}

</script>

<style scoped land="scss">
.login_container {
  width: 100%;
  /* 100vh表示窗口高度的100% */
  height: 100vh;
  /* no-repeat表示图片只会显示一次，不会在元素的背景上重复 */
  background: url('@/assets/images/background.jpg') no-repeat;
  /* cover,保持宽高比 */
  background-size: cover;

  .login_form {
    position: relative;
    /* relative,根据原本的位置(定位前)进行定位 */
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: rgb(255, 255, 255);
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: rgb(255, 255, 255);
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>