<script setup>
import { reactive } from 'vue';
import { financialBin, getPayDatas, getOrderId } from '../../utils/index.js';
import { IconDown } from '@arco-design/web-vue/es/icon';
import { router } from '../../router/index.js';
import { getOrderAddr } from '../../api/index.js';
import { Message } from '@arco-design/web-vue';

// 列名
const columns = [
    {
        width: '120',
        title: '商品图片',
        dataIndex: 'imgUrl',
        slotName: 'imgUrl',
    },
    {
        title: '商品名称',
        dataIndex: 'name'
    },
    {
        width: '220',
        title: '商品单价/元',
        dataIndex: 'normalprice',
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
];

// 数据
const data = reactive({
    orderId: getOrderId(),
    paymentData: getPayDatas(),
    items: {
        cnts: [],
        total: [],
    },
    totalPrice: 0,
    addrOpt: [],
    addr: '',
});

getOrderAddr().then(res => {
    if (res.data.code === 200) {
        console.log(res);
        data.addrOpt = res.data.value;
    }
}).catch(err => {
    console.log(err);
});

for (let i = 0; i < data.paymentData.length; i ++) {
    data.items.cnts[i] = parseInt(data.paymentData[i].cnts);
}

// 计算单个商品总价
const computeTotal = (idx) => {
    let total = parseFloat(data.paymentData[idx].total);
    return total;
};

// 计算商品支付总金额
const computePayMoney = () => { 
    let total = 0;
    for (let i = 0; i < data.paymentData.length; i ++) {
        total += parseFloat(data.paymentData[i].total);
    }
    total = financialBin(total);
    return total;
};

// 地址栏
const changeAddr = (addr) => {
    data.addr = addr;
};

const payBtn = () => {
    if (data.addr === '') {
        Message.info('请填写收货地址！');
        return;
    }
    localStorage.setItem('addr', data.addr);
    router.push({path: '/user/pay'});
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
        <section class="content">
            <section class="main">
                <a-table
                    :style="{letterSpacing: ''}"
                    :columns="columns"
                    column-resizable
                    :data="data.paymentData"
                >
                    <template #imgUrl="{ rowIndex }">
                        <img :src="'http://47.94.161.52/img/'+data.paymentData[rowIndex].imgUrl" alt="the merchant images" :style="{height: '50px', width: '70px'}" />
                    </template>
                    <template #total="{ rowIndex }">
                        {{computeTotal(rowIndex)}}
                    </template>
                </a-table>
                <div class="item-button">
                    <p class="title" :style="{marginLeft: '0'}">地址：</p>
                    <a-dropdown-button>
                        <a-input v-model.trim="data.addr" :style="{width: '490px'}" type="text" placeholder="请填写地址" />
                        <template #icon>
                            <icon-down />
                        </template>
                        <template #content>
                            <a-doption @click="changeAddr(addr)" v-for="addr in data.addrOpt">{{addr}}</a-doption>
                        </template>
                    </a-dropdown-button>
                    <p class="title">支付总金额：</p>
                    <p class="text-money">{{computePayMoney()}}</p>
                    <p class="title" :style="{marginLeft: '0'}">元</p>
                    <button :style="{width: '9%', marginLeft: '66px'}" @click="payBtn">付款</button>
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
:deep(.arco-btn-size-medium) {
    padding: 0;
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