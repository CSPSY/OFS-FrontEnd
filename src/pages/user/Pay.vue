<script setup>
import { payImg } from '../../utils/index.js';
</script>

<template>
    <div class="main-content">
        <header id="header">
            <nav>
                <router-link :to="{path: '/'}" class="nav-title">O F S</router-link>
                <div class="right">
                    <router-link :to="{path: '/user/shopping-cart'}" class="nav-text">购物车</router-link>
                    <li class="nav-text">我的订单</li>
                    <li class="nav-text">联系客服</li>
                </div>
            </nav>
        </header>
        <div :style="{display: 'flex', justifyContent: 'center', marginTop: '86px'}">
            <img :src="payImg" alt="支付二维码" />            
        </div>
    </div>
</template>

<style scoped>
@import "../../css/header.css";
.main-content {
    width: 100%;
    height: 100vh;
    background-color: #e6e5e5;
}
</style>