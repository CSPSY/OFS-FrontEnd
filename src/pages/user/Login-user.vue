<script setup>
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
</script>

<template>
    <div class="card">
        <h2 class="card-title">OFS 在线食品购物</h2>
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
            <div class="text-left">
                <router-link :to="{path: '/register-user'}">注册账号</router-link>
            </div>
            <div class="text-right">
                <router-link :to="{path: '/login-merchant'}">切换商家</router-link>
            </div>
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
.login-btn {
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
.items-text {
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
}
.items-text a {
    text-decoration: none;
    font-size: 1.2rem;
    letter-spacing: 0.05rem;
    color: whitesmoke;
    cursor: pointer;
}
.items-text a:hover, .login-btn:hover {
    color: rgb(223, 218, 218);
}
.text-left {
    padding-left: 18px;
    width: 50%;
}
.text-right {
    width: 50%;
    padding-right: 18px;
    display: flex;
    justify-content: end;
}
</style>