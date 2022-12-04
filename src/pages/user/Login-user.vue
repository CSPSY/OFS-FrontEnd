<script setup>
import { IconUser, IconLock } from '@arco-design/web-vue/es/icon';
import { reactive, watch } from 'vue';
import { sendLoginInfo } from '../../api/index.js';
import { router } from '../../router/index.js';

const data = reactive({
    loginInfo: {
        username: "",
        password: ""
    }
})

function handleLogin() {
    let { username, password } = data.loginInfo;
    if (username === "") {
        Message.info("请填写用户名!");
    } else if (password === "") {
        Message.info("请填写密码!");
    } else {
        const postObj = {
            username,
            password
        }
        sendLoginInfo(postObj).then(res => {
            if (res.data.code === 200) {
                localStorage.setItem('token', res.data.value.access_token);
                localStorage.setItem('username', username);
                Message.info("登陆成功！");
                router.push({path: '/'})
            }
            }).catch(err => {
                console.log(err);
        });
    }
}
</script>

<template>
    <div class="main-content">
        <div class="card">
            <h2 class="card-title">OFS 在线食品购物</h2>
            <div class="items">
                <icon-user class="input-icon" />
                <input v-model="data.loginInfo.username" type="text" placeholder="请输入账号" class="input-item" />
            </div>
            <div class="items" style="margin-bottom: 35px">
                <icon-lock class="input-icon" />
                <input v-model="data.loginInfo.password" type="password" placeholder="请输入密码" class="input-item" />
            </div>
            <div class="items">
                <button class="login-btn" @click="handleLogin">登录</button>
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
    </div>
</template>

<style scoped>
@import "../../css/input.css";
@import "../../css/card.css";
.main-content {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    background-image: url('../../../public/login-register-bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>