<script setup>
import { payOrderMoney } from '../../api/index.js';
import { Message } from '@arco-design/web-vue';

const payMoney = () => {
    const postObj = {
        orderId: localStorage.getItem('orderId'),
        address: localStorage.getItem('addr')
    }
    payOrderMoney(postObj).then(res => {
       if (res.data.code === 200) {
            Message.info('支付成功！');
       } 
    }).catch(err => {
        console.log(err);
    });
};

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
        <div :style="{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '86px'}">
            <img src="../../../public/pay.png" alt="支付二维码" />
            <div>
                <a-button :style="{marginTop: '52px', marginRight: '82px'}">取消支付</a-button>
                <a-button :style="{marginTop: '52px'}" @click="payMoney">确认支付</a-button>
            </div>
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