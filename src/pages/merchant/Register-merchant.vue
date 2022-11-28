<script setup>
import { IconUser, IconLock, IconEmail, IconCheckCircleFill } from '@arco-design/web-vue/es/icon';
</script>

<template>
    <div class="main-content">
        <div class="card">
            <h2 class="card-title">OFS 商家管理平台</h2>
            <div class="items">
                <icon-user class="input-icon" />
                <input type="text" placeholder="请输入账号" class="input-item" />
            </div>
            <div class="items" style="margin-bottom: 35px">
                <icon-lock class="input-icon" />
                <input type="password" placeholder="请输入密码" class="input-item" />
            </div>
            <div class="items" style="margin-bottom: 35px">
                <input style="width: 100%; padding-bottom: 8px;" type="password" placeholder="请确认密码" class="input-item" />
            </div>
            <div class="items-lr">
                <div class="left">
                    <icon-email class="input-icon" />
                    <input type="text" placeholder="请输入邮箱" class="input-item" required>
                </div>
                <div class="right">
                    <input type="text" placeholder="邮箱验证码" class="input-item" required>
                    <button class="captcha-btn" @click="">获取</button>
                </div>  
            </div>
            <div class="items">
                <button class="register-btn">注册</button>
            </div>
            <div class="items-text" style="margin-bottom: 6px;">
                <router-link :to="{path: '/login-merchant'}">点击此处返回登录</router-link>
            </div>
        </div>        
    </div>
</template>

<style scoped>
@import "../../css/input.css";
@import "../../css/card.css";
@import "../../css/card-register.css";
.main-content {
    width: 100%;
    height: 100vh;
    background-image: url('../../../public/login-register-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>