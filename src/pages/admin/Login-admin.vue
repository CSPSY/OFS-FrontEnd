<script setup>
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
</script>

<template>
    <div class="main-content">
        <div class="card">
            <h2 class="card-title">OFS 后台管理系统</h2>
            <div class="items">
                <icon-user class="input-icon" />
                <input type="text" placeholder="请输入账号" class="input-item" />
            </div>
            <div class="items" style="margin-bottom: 35px">
                <icon-lock class="input-icon" />
                <input type="password" placeholder="请输入密码" class="input-item" />
            </div>
            <div class="items">
                <button class="login-btn">登录</button>
            </div>
            <div class="items-text" style="margin-bottom: 6px;">
                <router-link :to="{path: '/register-admin'}">点击此处注册账号</router-link>
            </div>
        </div>        
    </div>
</template>

<style scoped>
@import "../../css/input.css";
@import "../../css/card.css";
.main-content {
    width: 100%;
    height: 100vh;
    background-image: url('../../../public/login-register-bg-admin.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>