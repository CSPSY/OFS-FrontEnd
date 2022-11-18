<script setup>
import { IconThumbUp, IconShareInternal, IconMore } from '@arco-design/web-vue/es/icon';
import { reactive } from 'vue';

// 父组件传值
const props = defineProps({
    goodsDesc   : {
        type: Object,
        required: true,
    }
});

</script>

<template>
    <div class="desc-card">
        <section :style="{height: '300px', overflow: 'hidden', marginBottom: '5px'}">
            <img 
                :style="{width: '100%', height: '100%', overflow: 'hidden', borderRadius: '5px 5px 0 0'}"
                :src="goodsDesc.imgAdr" :alt="goodsDesc.name"
            />
        </section>
        <section :style="{height:'230px'}" class="item item-text">
            <h3 class="title">{{goodsDesc.name}}</h3>
            <p class="text">{{goodsDesc.desc}}</p>
        </section>
        <section class="item-control">
            <div :style="{width: '33%', display: 'flex', alignItems: 'center'}">
                <p>单价</p>
                <p class="price-text">￥{{goodsDesc.price}}</p>
                <p class="price-text" v-show="goodsDesc.memberPrice !== '0'" style="color: #fc5531; border-left: 1.2px #9698a3 solid;">
                    ￥{{goodsDesc.memberPrice}}
                    <div style="font-size: .87rem; text-align: center; letter-spacing: .16rem; margin-top: 4px;">会员价</div>
                </p>
            </div>
            <div :style="{width: '45%'}">
                BB
            </div>
            <div class="item-button">
                <button>加入购物车</button>
                <button>立即购买</button>                
            </div>
        </section>
    </div>
    <!-- <a-card :style="{ width: '626px', height: '660px' }">
    <template #actions>
        <span class="icon-hover"> <IconThumbUp /> </span>
        <span class="icon-hover"> <IconShareInternal /> </span>
        <span class="icon-hover"> <IconMore /> </span>
    </template>
    <template #cover>
    <div :style="{ height: '330px', overflow: 'hidden' }">
        <img
            :style="{ width: '100%', height: '100%' }"
            :alt="goodsDesc.name"
            :src="goodsDesc.imgAdr"
        />
    </div>
    </template>
    <a-card-meta :title="goodsDesc.name" :description="goodsDesc.desc">
    <template #avatar>
        <div :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
            <a-avatar :size="24" :style="{ marginRight: '8px' }">
                A
            </a-avatar>
            <a-typography-text>Username</a-typography-text>
        </div>
    </template>
    </a-card-meta>
</a-card> -->
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
    background: rgba(51, 175, 241, 0.7);
}
</style>