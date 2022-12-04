<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps({
    goodsInfo   : {
        type: Object,
        required: true,
    }
});

const data = reactive({
    goodsNewInfo: {
        name: '',
        price: '',
        memberPrice: ''
    }
});

</script>

<template>
    <div class="info-card">
        <div class="info-img">
            <img :src="goodsInfo.imgAdr" alt="图片" :style="{width: '210px', height: '150px'}">
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
                <a-input v-model.trim="data.goodsNewInfo.price" :placeholder="goodsInfo.price" />
                <h3 :style="{width: '50%'}" class="text">会员单价(元)</h3>
                <a-input-number
                    v-model.trim="data.goodsNewInfo.memberPrice" :placeholder="goodsInfo.memberPrice"
                    :precision="2" :hide-button="true"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.info-card {
    display: flex;
    flex-direction: column;
    width: 640px;
    height: 660px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
    padding: 5px;
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