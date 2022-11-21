<script setup>
import { reactive } from 'vue';
import { IconUser, IconClose } from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import PersonalCard from './user/Personoal-card.vue';
import GoodsCard from './user/Goods-card.vue';
import { images, itemsData } from '../utils/index.js';

// data 数据
const data = reactive({
    items: itemsData,
    images,
    // 导航栏搜索框显示
    searchFrame: false,
    // 个性化设置卡片显示
    showPersonal: false,
    // 商品详情卡片显示
    showGoodsDesc: false,
    // 子组件传值
    goodsItem: {},
    // 是否显示遮罩层
    showCoverLayer: false
});

// 导航栏搜索框是否展示，判断搜索框到顶部距离
let showSearchFrame = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    data.searchFrame = scrollTop > 160;
}
window.addEventListener("scroll", showSearchFrame);

// 展示个性化设置卡片
const setPersonal = () => {
    data.showPersonal = true;
    data.showCoverLayer = true;
};

// 显示 / 消除商品详情卡片
const showDescCard = (id) => {
    data.showGoodsDesc = !data.showGoodsDesc;
    data.showCoverLayer = !data.showCoverLayer;
    if (id) {
        data.goodsItem = data.items[id - 1];
    }
};

</script>

<template>
    <div class="main-content">
        <header id="header">
            <nav>
                <a href="#" class="nav-title">O F S</a>
                <div class="left">
                    <li class="nav-text" @click="setPersonal">个性化设置</li>
                    <personal-card class="card-center" v-show="data.showPersonal"></personal-card>
                </div>
                <div style="width: 660px; display: flex;">
                    <a-input-search v-show="data.searchFrame" style="width: 640px; height: 34px; margin: 0 10px; align-self: center;" placeholder="输入想要的食品" />
                </div>
                <div class="right">
                    <li class="nav-text">购物车</li>
                    <li class="nav-text">我的订单</li>
                    <li class="nav-text">联系客服</li>
                </div>
            </nav>
        </header>
        <section class="content">
            <section class="main">
                <div class="search-bar">
                    <h2 class="title">O F S</h2>
                    <a-input-search class="search-merchant" placeholder="输入想要的食品" />
                </div>
                <div class="list-bar">
                    <div class="classify">
                        <h3 style="font-weight: 460; padding-left: 6px; font-size: 1.3rem; margin-bottom: 18px;">分类</h3>
                        <div class="list-items">
                            <li class="classify-items">
                                <a href="#">水果</a>
                            </li>
                            <li class="classify-items">
                                <a href="#">蔬菜</a>
                            </li>
                            <li class="classify-items">
                                <a href="#">肉品</a>
                            </li>
                            <li class="classify-items">
                                <a href="#">水产</a>
                            </li>
                            <li class="classify-items">
                                <a href="#">干货</a>
                            </li>
                            <li class="classify-items">
                                <a href="#">日配</a>
                            </li>
                            <li class="classify-items">
                                <a href="#">熟食</a>
                            </li>
                            <li class="classify-items">
                                <a href="#">糕点</a>
                            </li>
                        </div>
                    </div>
                    <div class="image-list">
                        <a-carousel
                            :style="{
                                width: '100%',
                                height: '100%'
                            }"
                            :auto-play="true"
                            indicator-type="dot"
                            show-arrow="hover"
                        >
                            <a-carousel-item v-for="image in images">
                            <img
                                :src="image"
                                :style="{
                                    width: '100%',
                                    height: '100%'
                                }"
                            />
                            </a-carousel-item>
                        </a-carousel>
                    </div>
                    <div class="personal-info">
                        <div class="member-bd">
                            <icon-user :style="{fontSize:'82px', color: '#666666', margin: '0 auto 6px'}" />
                            <p :style="{fontSize: '1.2rem', letterSpacing: '0.12rem', textAlign: 'center'}">Hi! 你好</p>
                        </div>
                        <div class="button-items">
                            <a-button shape="round" href="/login-user">登录</a-button>
                            <a-button shape="round" href="/register-user">注册</a-button>
                            <a-button shape="round" href="/login-merchant">店铺</a-button>
                        </div>  
                    </div>
                </div>
                <div class="list-items">
                    <div class="item" v-for="item in data.items" :key="item.id">
                        <a-row style="display: flex;">
                            <a-col :span="4">
                                <img :src="item.imgAdr" alt="the merchant images" style="width: 94%;" >
                            </a-col>
                            <a-col :span="10" style="border-left: 1px #9698a3 solid; height: 122px; padding: 6px 16px 12px;">
                                <h3 style="margin-bottom: 12px;">{{item.name}}</h3>
                                <p style="white-space: pre-wrap; line-height: 1.6rem;">{{item.desc}}</p>
                            </a-col>
                            <a-col style="display: flex; justify-content: center; align-items: center; height: 122px;" :span="6">
                                <p class="price-text">￥{{item.price}}</p>
                                <p class="price-text" v-show="item.memberPrice !== '0'" style="color: #fc5531; border-left: 1.2px #9698a3 solid;">
                                    ￥{{item.memberPrice}}
                                    <div style="font-size: .87rem; text-align: center; letter-spacing: .16rem; margin-top: 4px;">会员价</div>
                                </p>
                            </a-col>
                            <a-col :span="4" class="item-control">
                                <a-button shape="round" style="padding: 16px 0; border-radius: 6px;">加入购物车</a-button>
                                <a-button shape="round" style="padding: 16px 0; border-radius: 6px;" @click="showDescCard(item.id)">查看商品</a-button>
                                <goods-card class="card-center desc-card" :goods-desc="data.goodsItem" v-show="data.showGoodsDesc"></goods-card>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </section>
        </section>
        <footer>
            <p class="title" style="font-size: 1.2rem;">OFS 在线食品购物</p>
        </footer>
    </div>
    <div class="cover-layer" v-show="data.showCoverLayer">
        <icon-close class="close-btn" size="34" @click="showDescCard(false)" />
    </div>
</template>

<style scoped>
@import "../css/header.css";
.main-content {
    background-color: #e6e5e5;
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
.title {
    font-size: 3.6rem;
    font-weight: 200;
    text-align: center;
    opacity: 0.6;
    margin: 12px 0;
    letter-spacing: .3rem;
}
.search-bar {   
    display: flex;
    flex-direction: column;
    margin-bottom: 22px;
}
.search-merchant {
    width: 766px;
    height: 42px;
    border-radius: 6px;
    align-self: center;
}
.list-bar {
    display: flex;
    margin-bottom: 26px;
}
.list-bar .classify {
    width: 22%;
    margin: 0 12px 0 7px;
    padding: 36px 12px 18px 22px;
    background-color: #fefeff;
    border-radius: 8px;
}
.list-bar .image-list {
    width: 54%;
    margin-right: 7px;
    border-radius: 6px;
    overflow: hidden;
}
.list-bar .personal-info {
    width: 24%;
    padding: 22px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.classify .list-items {
    display: flex;
    flex-flow: wrap;
    flex-direction: row;
}
.classify-items {
    width: 50%;
    padding: 12px 6px;
}
.classify-items:hover {
    background-color: rgba(0, 0, 0, .06);
    border-radius: 6px;
}
.classify-items a {
    border-left: 1px black solid;
    padding: 6px 28px 6px 5px;
    width: 100%;
    opacity: .8;
    font-size: 1rem;
    color: black;
}
.personal-info .member-bd {
    padding: 16px 0 0;
    display: flex;
    flex-direction: column;
}
.personal-info .button-items {
    padding: 0 6px;
    display: flex;
    justify-content: space-around;
}
.personal-info .button-items a {
    height: 36px;
    width: 82px;
}
.list-items {
    padding: 0 6px;
    margin-bottom: 6px;
}
.list-items .item {
    height: 151px;
    padding: 13px 20px;
    margin-bottom: 12px;
    border-radius: 6px;
    background-color: #fefeff;
}
.list-items .item img {
    height: 122px;
    width: auto;
}
.list-items .price-text {
    font-size: 1.3rem;
    padding: 12px;
}
.list-items .item .item-control {
    align-self: center;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 26px;
    height: 100px;
}
/* 显示卡片 */
.card-center {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 32%);
}
/* 商品详情卡片 */
.desc-card {
    z-index: 131;
    transform: translate(-50%, -55%);
}
/* 遮罩层 */
.cover-layer {
    position: fixed;
    z-index: 121;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .6);
}
.close-btn {
    cursor: pointer;
    float: right;
    color: rgba(254, 254, 255, .92);
    margin: 4px 22px;
}
footer {
    display: flex;
    justify-content: center;
    height: 72px;
}
</style>