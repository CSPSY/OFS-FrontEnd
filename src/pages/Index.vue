<script setup>
import { reactive } from 'vue';
import { IconUser, IconClose } from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import PersonalCard from './user/Personoal-card.vue';
import GoodsCard from './user/Goods-card.vue';
import { judgeToken, getMerchantsItems, addItemsToShCart, sendLogout, searchMerchant } from '../api/index.js';
import { router } from '../router';

// data 数据
const data = reactive({
    items: [],
    images: [],
    // 导航栏搜索框显示
    searchFrame: false,
    // 个性化设置卡片显示
    showPersonal: false,
    // 商品详情卡片显示
    showGoodsDesc: false,
    // 子组件传值
    goodsItem: {},
    // 是否显示遮罩层
    showCoverLayer: false,
    // 登录 / 没登陆状态
    loginStatus: false,
    // 搜索商品名称
    searchItemsName: '',
    searchItemsName2: '',
    username: localStorage.getItem('username')
});

// 导航栏搜索框是否展示，判断搜索框到顶部距离
const showSearchFrame = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop > 160) {
        data.searchFrame = true;
    } else {
        data.searchFrame = false;
        data.searchItemsName = '';
    }
}
window.addEventListener("scroll", showSearchFrame);

// 展示个性化设置卡片
const setPersonal = () => {
    if (data.loginStatus) {
        data.showPersonal = true;
        data.showCoverLayer = true;
    } else {
        Message.info("请先登录!");
        return false;
    }
};

// 判断是否登录
const judgeIfLogin = () => {
    if (localStorage.getItem('token') === null) {
        data.loginStatus = false;
        return;
    }
    const postObj = { token: localStorage.getItem('token') };
    judgeToken(postObj).then(res => {
        if (res.data.code === 200) {
            data.loginStatus = true;
        } else {
            data.loginStatus = false;
            localStorage.clear();
        }
    }).catch(err => {
        console.log(err);
    });
}
judgeIfLogin();

// 显示商品详情卡片
const showDescCard = (idx) => {
    data.showGoodsDesc = true;
    data.showCoverLayer = true;
    data.goodsItem = data.items[idx];
}

// 消除卡片
const disappearCard = () => {
    data.showGoodsDesc = false;
    data.showPersonal = false;
    data.showCoverLayer = !data.showCoverLayer;
};

// 获取首页商品数据
const getItemsData = () => {
    getMerchantsItems().then(res => {
        let items = res.data.value;
        for (let i = 0; i < items.length; i ++) {
            items[i].idx = i;
            items[i].imgUrl = 'http://47.94.161.52/img/' + items[i].imgUrl;
            if (i < 8) {
                data.images[i] = items[i].imgUrl;
            }
            items[i].descr = items[i].descr.replaceAll('\\n', '\n');
        }
        data.items = res.data.value;
    }).catch(err => {
        console.log(err);
    });
};

getItemsData();

// 加入购物车
const addItemsToCart = (id) => {
    const postObj = {
        pid : id
    }
    addItemsToShCart(postObj).then(res => {
        if (res.data.code === 200) {
            Message.info('加入购物车成功');
        }
    }).catch(err => {
        console.log(err);
    });
};

// 去购物车
const toShCart = () => {
    if (data.loginStatus) {
        router.push('/user/shopping-cart');
    } else {
        Message.info("请先登录!");
        return false;
    }
};

// 搜索商品
const searchGoods = () => {
    let goodsSearch = data.searchItemsName || data.searchItemsName2;
    if (goodsSearch === "") {
        return;
    }
    console.log(goodsSearch);
    searchMerchant(goodsSearch).then(res => {
        if (res.data.code === 200 && res.data.value.length) {
            let items = res.data.value;
            for (let i = 0; i < items.length; i ++) {
                items[i].idx = i;
                items[i].imgUrl = 'http://47.94.161.52/img/' + items[i].imgUrl;
                items[i].descr = items[i].descr.replace('\n', '<br>');
            }
            data.items = res.data.value;
        } else {
            Message.info('没找到相关商品');
            getItemsData();
        }
    }).catch(err => {
        console.log(err);
    });
};

// 退出登录
const handleLogout = () => {
    sendLogout().then(res => {
        Message.info('退出登录成功');
        localStorage.clear();
        location.reload();
    }).catch(err => {
        console.log(err);
    })
};
</script>

<template>
    <div class="main-content">
        <header id="header">
            <nav>
                <a href="#" class="nav-title">O F S</a>
                <div class="left">
                    <li class="nav-text" @click="setPersonal">个性化设置</li>
                </div>
                <div style="width: 660px; display: flex;">
                    <a-input-search
                        v-show="data.searchFrame"
                        v-model.trim="data.searchItemsName"
                        style="width: 640px; height: 34px; margin: 0 10px; align-self: center;"
                        placeholder="输入想要的食品"
                        @search="searchGoods"
                    />
                </div>
                <div class="right">
                    <li @click="toShCart" class="nav-text">购物车</li>
                    <li class="nav-text">我的订单</li>
                    <li class="nav-text">联系客服</li>
                </div>
            </nav>
        </header>
        <section class="content">
            <section class="main">
                <div class="search-bar">
                    <h2 class="title">O F S</h2>
                    <a-input-search
                        v-model.trim="data.searchItemsName2"
                        class="search-merchant" placeholder="输入想要的食品" 
                        @search="searchGoods"
                    />
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
                            <a-carousel-item v-for="image in data.images">
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
                            <span
                                :style="{fontSize: '1.2rem', letterSpacing: '0.12rem', textAlign: 'center', lineHeight: '1.6rem'}"
                            >Hi! 你好</span>
                            <span
                                :style="{fontSize: '1.2rem', letterSpacing: '0.12rem', textAlign: 'center', lineHeight: '1.6rem'}"
                                v-show="data.loginStatus"
                            >用户 {{data.username}}</span>
                        </div>
                        <div v-show="!data.loginStatus" class="button-items">
                            <a-button shape="round" href="/login-user">登录</a-button>
                            <a-button shape="round" href="/register-user">注册</a-button>
                            <a-button shape="round" href="/login-merchant">店铺</a-button>
                        </div>
                        <div v-show="data.loginStatus" class="button-items">
                            <a-button shape="round" @click="handleLogout">退出登录</a-button>
                        </div>
                    </div>
                </div>
                <div class="list-items">
                    <div class="item" v-for="item in data.items" :key="item.id">
                        <a-row style="display: flex;">
                            <a-col :span="4">
                                <img :src="item.imgUrl" alt="the merchant images" style="width: 94%;" />
                            </a-col>
                            <a-col :span="10" style="border-left: 1px #9698a3 solid; height: 122px; padding: 6px 16px 12px;">
                                <h3 style="margin-bottom: 12px;">{{item.name}}</h3>
                                <p style="white-space: pre-wrap; line-height: 1.6rem;">{{item.descr}}</p>
                            </a-col>
                            <a-col style="display: flex; justify-content: center; align-items: center; height: 122px;" :span="6">
                                <p class="price-text">￥{{item.normalprice}}</p>
                                <p class="price-text" v-show="item.memberprice !== '0'" style="color: #fc5531; border-left: 1.2px #9698a3 solid;">
                                    ￥{{item.memberprice}}
                                    <div style="font-size: .87rem; text-align: center; letter-spacing: .16rem; margin-top: 4px;">会员价</div>
                                </p>
                            </a-col>
                            <a-col :span="4" class="item-control">
                                <a-button shape="round" style="padding: 16px 0; border-radius: 6px;" @click="addItemsToCart(item.id)">加入购物车</a-button>
                                <a-button shape="round" style="padding: 16px 0; border-radius: 6px;" @click="showDescCard(item.idx)">查看商品</a-button>
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
        <icon-close class="close-btn" size="34" @click="disappearCard" />
    </div>
    <personal-card class="card-center personal-card" v-show="data.showPersonal"></personal-card>
    <goods-card class="card-center desc-card" :goods-desc="data.goodsItem" v-show="data.showGoodsDesc"></goods-card>
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
/* 
    商品详情卡片
    个性化设置卡片
*/
.desc-card, .personal-card {
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