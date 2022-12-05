<script setup>
import { Message } from '@arco-design/web-vue';
import { defineProps, onDeactivated, reactive } from 'vue';
import { updateManageGoods } from '../../../api/index.js';

const props = defineProps({
    goodsInfo   : {
        type: Object,
        required: true,
    }
});

const data = reactive({
    goodsNewInfo: {
        name: '',
        normalprice: '',
        descr: '',
        memberprice: '',
        sum: '',
        imgUrl: ''
    }
});

const updateGoodsInfo = () => {
    const oldInfo = props.goodsInfo;
    const newInfo = data.goodsNewInfo;
    const postObj = {
        id: oldInfo.id,
        name: newInfo.name === '' ? oldInfo.name : newInfo.name,
        descr: newInfo.descr === '' ? oldInfo.descr : newInfo.descr,
        imgUrl: newInfo.imgUrl === '' ? oldInfo.imgUrl : newInfo.imgUrl,
        sum: newInfo.sum === '' ? oldInfo.sum : newInfo.sum,
        normalprice: newInfo.normalprice === '' ? oldInfo.normalprice : newInfo.normalprice,
        memberprice: newInfo.memberprice === '' ? oldInfo.memberprice : newInfo.memberprice,
        pdate: "2022-12-01",
        categoryid: oldInfo.categoryid,
        storieId: oldInfo.storieId,
    };
    updateManageGoods(postObj).then(res => {
        console.log(res);
        if (res.data.code === 200) {
            Message.info('更新商品成功！');
        }
    }).catch(err => {
        console.log(err);
    });
};

</script>

<template>
    <div class="info-card">
        <div class="info-img">
            <img :src="goodsInfo.imgUrl" alt="图片" :style="{width: '210px', height: '150px'}">
            <section class="right">
                <h3 class="text" :style="{margin: '28px 0 28px'}">更换图片：</h3>
                <a-upload list-type="pictrue" action="/" :limit="1" />
            </section>
        </div>
        <div class="info-name">
            <div class="items">
                <h3 :style="{width: '24%'}" class="text">商品名称：</h3>
                <a-input v-model.trim="data.goodsNewInfo.name" :placeholder="goodsInfo.name" />
            </div>
            <div class="items">
                <h3 :style="{width: '50%'}" class="text">商品单价(元)</h3>
                <a-input v-model.trim="data.goodsNewInfo.normalprice" :placeholder="goodsInfo.normalprice" />
                <h3 :style="{width: '50%'}" class="text">会员单价(元)</h3>
                <a-input-number
                    v-model.trim="data.goodsNewInfo.memberprice" :placeholder="goodsInfo.memberprice"
                    :precision="2" :hide-button="true"
                />
            </div>
            <div class="items">
                <h3 :style="{width: '24%'}" class="text">商品描述：</h3>
                <a-textarea v-model.trim="data.goodsNewInfo.descr" :placeholder="goodsInfo.descr" />
            </div>
            <div class="items">
                <h3 :style="{width: '30%'}" class="text">商品库存</h3>
                <a-input-number v-model.trim="data.goodsNewInfo.sum" :placeholder="goodsInfo.sum" :min="0"></a-input-number>
                <a-button
                    :style="{marginLeft: '62px', padding: '2px 32px', borderRadius: '6px'}"
                    type="primary"  @click="updateGoodsInfo()"
                >确定</a-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 640px;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
    padding: 18px;
    background: #ffffff;
}
.text {
    letter-spacing: .22rem;
    font-size: 1.12rem;
    font-weight: 500;
    text-align: center;
    margin: 2px 0;
    letter-spacing: .22rem;  
}
.info-img {
    display: flex;
    height: 24%;
    margin-bottom: 22px;
}
.info-img .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 12px;
}
.info-name {
    display: flex;
    flex-direction: column;
    padding-right: 12px;
}
.info-name .items {
    display: flex;
    margin-bottom: 22px;
}
</style>