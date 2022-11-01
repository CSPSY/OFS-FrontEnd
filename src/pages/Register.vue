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
            <button class="login-btn">注册</button>
        </div>
        <div class="items-text" style="margin-bottom: 6px;">
            <router-link :to="{path: '/login'}">点击此处返回登录</router-link>
        </div>
    </div>
</template>

<script>
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
export default {
    components: { IconUser, IconLock },
    name: 'Login'
};
</script>

<style>
@import "../css/input.css";
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #43515c;
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
    background: transparent;
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

    font-size: 1.4rem;
    color: whitesmoke;
    padding-left: 9px;
}
.input-icon {
    width: 8%;
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
.login-btn {
    border-radius: 5px;
    font-size: 1.3rem;
    border: 0;
    outline: 0;
    padding: 12px 156px;
    color: whitesmoke;
    background-color: #018ccf;
    letter-spacing: 0.6rem;
}
</style>