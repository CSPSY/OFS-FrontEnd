<script setup>
import { reactive } from 'vue';
import { goodsData } from '../../../utils/index.js';
import { IconClose } from '@arco-design/web-vue/es/icon';
import InfoChange from './Info-change.vue';

// 列名
const columns = [
    {
        width: '120',
        title: '商品图片',
        dataIndex: 'imgAdr',
        slotName: 'imgAdr'
    },
    {
        width: '160',
        title: '商品名称',
        dataIndex: 'name'
    },
    {
        title: '商品描述',
        dataIndex: 'desc'
    },
    {
        width: '150',
        title: '商品单价/元',
        dataIndex: 'price'
    },
    {
        width: '150',
        title: '商品会员价/元',
        dataIndex: 'memberPrice'
    },
    {
        width: '140',
        title: '商品库存',
        dataIndex: 'cnts'
    },
    {
        width: '160',
        title: '商品信息修改',
        slotName: 'changeInfo'
    }
];

// 数据
const data = reactive({
    goodsData,
    goodsInfo: {},
    showCoverLayer: false,
    showInfoCard: false
});

const showInfoCard = (idx) => {
    data.showCoverLayer = true;
    data.showInfoCard = true;
    data.goodsInfo = data.goodsData[idx];
};

// 消除卡片
const disappearCard = () => {
    data.showCoverLayer = false;
    data.showInfoCard = false;
};
</script>

<template>
    <div class="main-content">
        <a-table
            :style="{letterSpacing: ''}"
            :columns="columns"
            column-resizable
            :data="data.goodsData"
        >
            <template #imgAdr="{ rowIndex }">
                <img :src="data.goodsData[rowIndex].imgAdr" alt="the merchant images" :style="{height: '50px', width: '70px'}" />
            </template>
            <template #changeInfo="{ rowIndex }">
                <a-button @click="showInfoCard(rowIndex)" class="item-button">修改</a-button>
            </template>
        </a-table>
    </div>
    <div class="cover-layer" v-show="data.showCoverLayer">
        <icon-close class="close-btn" size="34" @click="disappearCard" />
    </div>
    <InfoChange class="info-card" :goods-info="data.goodsInfo" v-show="data.showInfoCard"></InfoChange>
</template>

<style scoped>
.main-content {
    width: 100%;
    height: 100%;
}
:deep(.arco-table-th-title) {
    letter-spacing: 0.12rem;
}
.item-button {
    border: 0;
    outline: 0;
    border-radius: 6px;
    padding: 8px 12px;
    background: rgba(179, 227, 252, 0.7);
    letter-spacing: .26rem;
}
.item-button:hover {
    background: rgba(82, 191, 249, 0.7);
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
/* 显示卡片 */
.info-card {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 131;
    transform: translate(-50%, -55%);
}
</style>