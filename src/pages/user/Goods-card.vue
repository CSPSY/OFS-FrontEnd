<script setup>
import { IconPlus, IconMinus } from '@arco-design/web-vue/es/icon';
import { reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { router } from '../../router/index.js';

const data = reactive({
    purchaseCnts: 1
});

// 父组件传值
const props = defineProps({
    goodsDesc   : {
        type: Object,
        required: true,
    },
    loginStatus : {
        type: Boolean,
        required: true,
    }
});

// 数字输入框
const handleMinus = () => {
    if (data.purchaseCnts > 1) {
        data.purchaseCnts --;
    }
};

const handlePlus = () => {
    data.purchaseCnts ++;
};

// 加入购物车
const addShoppingCart = () => {
    if (!props.loginStatus) {
        Message.info("请先登录！");
        return;
    }
    Message.info("加入购物车成功！");
};

// 立即购买
const purchaseGoods = () => {
    if (!props.loginStatus) {
        Message.info("请先登录！");
        return;
    }
    router.push({path: '/user/payment'});
};
</script>

<template>
    <div class="desc-card">
        <section :style="{height: '300px', overflow: 'hidden', marginBottom: '5px'}">
            <img
                :style="{width: '100%', height: '100%', overflow: 'hidden', borderRadius: '5px 5px 0 0'}"
                :src="goodsDesc.imgUrl" :alt="goodsDesc.name"
            />
        </section>
        <section :style="{height:'230px'}" class="item item-text">
            <h3 class="title">{{goodsDesc.name}}</h3>
            <p class="text">{{goodsDesc.descr}}</p>
        </section>
        <section class="item-control">
            <div :style="{width: '33%', display: 'flex', alignItems: 'center'}">
                <p :style="{lineHeight: '1.55rem', fontSize: '1rem'}">单价</p>
                <p class="price-text">￥{{goodsDesc.normalprice}}</p>
                <p class="price-text" v-show="goodsDesc.memberprice !== '0'" style="color: #fc5531; border-left: 1.2px #9698a3 solid;">
                    ￥{{goodsDesc.memberprice}}
                    <div style="font-size: .87rem; text-align: center; letter-spacing: .16rem; margin-top: 4px;">会员价</div>
                </p>
            </div>
            <div class="purchase-control" :style="{width: '45%'}">
                <p :style="{marginTop: '4px', fontSize: '1rem', letterSpacing: '.32rem', paddingLeft: '6px'}">数量</p>
                <div :style="{display: 'flex'}">
                    <span class="btn-control" @click="handleMinus">
                        <IconMinus />
                    </span>
                    <a-input-number v-model="data.purchaseCnts" hide-button :min="1" :precision="0" />
                    <span class="btn-control" @click="handlePlus">
                        <IconPlus />
                    </span>
                </div>
            </div>
            <div class="item-button">
                <button @click="addShoppingCart">加入购物车</button>
                <button @click="purchaseGoods">立即购买</button>
            </div>
        </section>
    </div>
</template>

<style scoped>
.icon-hover {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: all 0.1s;
}
.icon-hover:hover {
    background-color: rgb(var(--gray-2));
}
.desc-card {
    display: flex;
    flex-direction: column;
    width: 626px;
    height: 660px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
    padding: 2px;
    background: #ffffff;
}
.item-text {
    padding: 12px;
}
.title {
    font-size: 1.36rem;
    font-weight: 620;
    opacity: 0.6;
    margin-bottom: 14px;
    letter-spacing: .16rem;
}
.text {
    font-size: 1.12rem;
    line-height: 1.8rem;
    font-weight: 520;
    opacity: 0.7;
    margin-bottom: 14px;
    letter-spacing: .12rem;
}
.item-control {
    display: flex;
    padding: 12px;
    height: 120px;
}
.price-text {
    font-size: 1.3rem;
    padding: 12px;
}
.item-button {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 6px;
}
.item-button button {
    cursor: pointer;
    outline: 0;
    border: 0;
    border-radius: 12px;
    padding: 8px 12px;
    background: rgba(179, 227, 252, 0.7);
    letter-spacing: .06rem;
}
.item-button button:hover {
    background: rgba(82, 191, 249, 0.7);
}
.purchase-control {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 12px;
}
.btn-control {
    cursor: pointer;
    background: rgba(242, 243, 245);
    padding: 8px;
}
.btn-control:hover {
    background: rgb(206, 206, 207);
}
</style>