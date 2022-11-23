<script setup>
import { reactive } from 'vue';
import { paymentData, financialBin } from '../../utils/index.js';
import { IconPlus, IconMinus } from '@arco-design/web-vue/es/icon';

// 列名
const columns = [
    {
        width: '120',
        title: '商品图片',
        dataIndex: 'imgAdr',
        slotName: 'imgAdr',
    },
    {
        title: '商品名称',
        dataIndex: 'name'
    },
    {
        width: '220',
        title: '商品单价/元',
        dataIndex: 'price',
    },
    {
        width: '220',
        title: '购买数量',
        dataIndex: 'cnts',
        slotName: 'cnts'
    },
    {
        width: '220',
        title: '商品总价/元',
        dataIndex: 'total',
        slotName: 'total'
    },
]

// 数据
const data = reactive({
    paymentData,
    items: {
        cnts: [],
        total: [],
    },
    totalPrice: 0
});

for (let i = 0; i < data.paymentData.length; i ++) {
    data.items.cnts[i] = parseInt(data.paymentData[i].cnts);
}

// 数字输入框
const handleMinus = (idx) => {
    if (data.items.cnts[idx] > 0) {
        data.items.cnts[idx] --;
    }
};

const handlePlus = (idx) => {
    data.items.cnts[idx] ++;
};

// 计算单个商品总价
const computeTotal = (idx) => {
    let total = financialBin(data.items.cnts[idx] * parseFloat(data.paymentData[idx].price));
    data.items.total[idx] = total;
    data.totalPrice = computePayMoney();
    return total;
};

// 计算商品支付总金额
const computePayMoney = () => {
    let total = 0;
    for (let i = 0; i < data.items.cnts.length; i ++) {
        total += parseFloat(data.items.total[i]);
    }
    total = financialBin(total);
    return total;
};
</script>

<template>
    <div class="main-content">
        <header id="header">
            <nav>
                <router-link :to="{path: '/'}" class="nav-title">O F S</router-link>
                <div class="right">
                    <li class="nav-text">购物车</li>
                    <li class="nav-text">我的订单</li>
                    <li class="nav-text">联系客服</li>
                </div>
            </nav>
        </header>
        <section class="content">
            <section class="main">
                <a-table
                    :style="{letterSpacing: ''}"
                    :columns="columns"
                    column-resizable
                    :data="data.paymentData"
                >
                    <template #imgAdr="{ rowIndex }">
                        <img :src="data.paymentData[rowIndex].imgAdr" alt="the merchant images" :style="{height: '50px', width: '70px'}" />
                    </template>
                    <template #cnts="{ rowIndex }">
                        <div :style="{display: 'flex', paddingRight: '32px'}">
                            <span class="btn-control" @click="handleMinus(rowIndex)">
                                <IconMinus />
                            </span>
                            <a-input-number v-model.number="data.items.cnts[rowIndex]" hide-button :min="0" :precision="0" />
                            <span class="btn-control" @click="handlePlus(rowIndex)">
                                <IconPlus />
                            </span>
                        </div>
                    </template>
                    <template #total="{ rowIndex }">
                        {{computeTotal(rowIndex)}}
                    </template>
                </a-table>
                <div class="item-button">
                    <p class="title">支付总金额：</p>
                    <p class="text-money">{{data.totalPrice}}</p>
                    <p class="title" :style="{marginLeft: '0'}">元</p>
                    <button :style="{width: '9%', marginLeft: '66px'}">付款</button>
                </div>
            </section>
        </section>
    </div>
</template>

<style scoped>
@import "../../css/header.css";
.main-content {
    width: 100%;
    height: 100vh;
    background-color: #e6e5e5;
}
:deep(.arco-table-th-title) {
    letter-spacing: 0.12rem;
}
.content {
    display: flex;
    justify-content: center;
}
.main {
    width: 1190px;
    display: flex;
    flex-direction: column;
}
.btn-control {
    cursor: pointer;
    background: rgba(242, 243, 245);
    padding: 8px;
}
.btn-control:hover {
    background: rgb(206, 206, 207);
}
.item-button {
    display: flex;
    margin-top: 12px;
    padding: 6px;
    height: 45px;
}
.title {
    font-size: 1rem;
    margin-left: auto;
    line-height: 32px;
    font-weight: 300;
    letter-spacing: .3rem;
}
.text-money {
    line-height: 32px;
    text-align: center;
    font-weight: 360;
    font-size: 1.32rem;
    padding: 0 8px;
    letter-spacing: .12rem;
}
.item-button button {
    cursor: pointer;
    outline: 0;
    border: 0;
    border-radius: 12px;
    padding: 8px 12px;
    background: rgba(179, 227, 252, 0.7);
    letter-spacing: .32rem;
    font-weight: 400;
    font-size: 1rem;
}
.item-button button:hover {
    background: rgba(82, 191, 249, 0.7);
}
</style>