<script setup>
import { IconUser, IconLock, IconEmail } from '@arco-design/web-vue/es/icon';
import { reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { sendCaptcha, getCaptcha, sendRegisterInfo } from '../../api/index.js';

const data = reactive({
    userinfo: {
        username: '',
        password: '',
        rePassword: '',
        email: '',
        captcha: ''
    }
});

const handleRegister = () => {
    const info = data.userinfo;
    if (info.username === "") {
        Message.info("请填写你的用户名！");
    } else if (info.password === "") {
        Message.info("请填写你的密码！");
    } else if (info.rePassword === "") {
        Message.info("请填写确认密码！");
    } else if (info.email === "") {
        Message.info("请填写你的邮箱！");
    } else if (info.captcha === "") {
        Message.info("请填写邮箱验证码！")
    } else if (info.password !== info.rePassword) {
        Message.info("输入的两次密码不一致！")
    } else {
        const postObj = { email: data.userinfo.email };
        getCaptcha(postObj).then(res => {
            if (res.data.code === 200) {
                const value = res.data.value.code;
                if (info.captcha !== value) {
                    Message.info('验证码错误，请重新输入！');
                    return;
                }
                const postObj = {
                    username: info.username,
                    email: info.email,
                    role: "1",
                    password: info.password
                }
                sendRegisterInfo(postObj).then(res => {
                    if (res.data.code === 200) {
                        Message.info('注册成功~');
                        console.log(res);
                        router.push('/login-user');
                    }
                }).catch(err => {
                    console.log(err);
                });
            } else {
                Message.info('验证码错误，请重新输入！');
            }
        }).catch(err => {
            console.log(err);
        });
    }
};

const getEmailCaptcha = () => {
    if (data.userinfo.email === "") {
        Message.info("请填写邮箱！");
    }
    const postObj = { email: data.userinfo.email };
    sendCaptcha(postObj).then(res => {
        if (res.data.code === 200) {
            Message.info('邮箱验证码已发送，请查阅~');
        } else {
            Message.info('请填写正确的邮箱！');
        }
    }).catch(err => {
        console.log(err);
    });
};

</script>

<template>
    <div class="main-content">
        <div class="card">
            <h2 class="card-title">OFS 在线食品购物</h2>
            <div class="items">
                <icon-user class="input-icon" />
                <input v-model.trim="data.userinfo.username" type="text" placeholder="请输入账号" class="input-item" />
            </div>
            <div class="items" style="margin-bottom: 35px">
                <icon-lock class="input-icon" />
                <input v-model.trim="data.userinfo.password" type="password" placeholder="请输入密码" class="input-item" />
            </div>
            <div class="items" style="margin-bottom: 35px">
                <input v-model.trim="data.userinfo.rePassword" style="width: 100%; padding-bottom: 8px;" type="password" placeholder="请确认密码" class="input-item" />
            </div>
            <div class="items-lr">
                <div class="left">
                    <icon-email class="input-icon" />
                    <input v-model.trim="data.userinfo.email" type="text" placeholder="请输入邮箱" class="input-item" required>
                </div>
                <div class="right">
                    <input v-model.trim="data.userinfo.captcha" type="text" placeholder="邮箱验证码" class="input-item" required>
                    <button class="captcha-btn" @click="getEmailCaptcha">获取</button>
                </div>  
            </div>
            <div class="items">
                <button class="register-btn" @click="handleRegister">注册</button>
            </div>
            <div class="items-text" style="margin-bottom: 6px;">
                <router-link :to="{path: '/login-user'}">点击此处返回登录</router-link>
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