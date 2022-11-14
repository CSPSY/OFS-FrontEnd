<script setup>
import { IconUser, IconLock, IconEmail, IconCheckCircleFill } from '@arco-design/web-vue/es/icon';
</script>

<template>
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
</template>

<style>
@import "../../css/input.css";
body {
    background-image: url('../../../public/login-register-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
.card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: whitesmoke;
    border: 1px whitesmoke solid;
    border-radius: 6px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
    display: flex;
    flex-direction: column;
    padding: 24px 32px 36px;
    background-color: rgba(124, 124, 124, 0.65);
}
.card-title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 32px;
}
.items {
    display: flex;
    justify-content: center;
    width: 512px;
    margin-bottom: 26px;
}
.input-item {
    width: 92%;
    background: transparent;
    border: 0;
    outline: 0;
    border-bottom:1px solid whitesmoke;

    font-size: 1rem;
    color: whitesmoke;
    padding-left: 9px;
    letter-spacing: 0.08em;
}
.input-icon {
    width: 7%;
    padding-left: 6px;
    padding-bottom: 6px;
    border-bottom:1px solid whitesmoke;
}
.items-text {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
}
.items-text a {
    text-decoration: none;
    font-size: 1.2rem;
    /* font-weight: 600; */
    letter-spacing: 0.05rem;
    color: whitesmoke;
    cursor: pointer;
}
.register-btn {
    border-radius: 5px;
    font-size: 1.3rem;
    border: 0;
    outline: 0;
    padding: 12px 156px;
    color: whitesmoke;
    background-color: rgb(1, 140, 207, .88);
    letter-spacing: 0.6rem;
    cursor: pointer;
}

.items-lr {
    display: flex;
    width: 512px;
    margin-bottom: 32px;
}

.left, .right {
    display: flex;
}
.left {
    width: 58%;
}
.left input, .right input {
    padding-bottom: 4px;
    font-size: 1rem;
}
.left .input-icon {
    width: 14%;
}
.right {
    right: 30%;
    margin-left: 30px;
}
.captcha-btn {
    width: 50%;
    border-radius: 5px;
    margin-left: 12px;
    border: 0;
    outline: 0;
    color: whitesmoke;
    background-color: rgb(1, 140, 207, .88);
    letter-spacing: 0.22em;
    cursor: pointer;
}
</style>