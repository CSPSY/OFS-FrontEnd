<script setup>
import { reactive } from 'vue';
// import { goodsData } from '../../../utils/index.js';
import { IconClose } from '@arco-design/web-vue/es/icon';
import InfoChange from './Info-change.vue';
import { getManageGoods, deleteManageGoods } from '../../../api';
import { Message } from '@arco-design/web-vue';
import { nextTick } from 'vue';

// 列名
const columns = [
    {
        width: '120',
        title: '商品图片',
        dataIndex: 'imgUrl',
        slotName: 'imgUrl'
    },
    {
        width: '160',
        title: '商品名称',
        dataIndex: 'name'
    },
    {
        title: '商品描述',
        dataIndex: 'descr'
    },
    {
        width: '150',
        title: '商品单价/元',
        dataIndex: 'normalprice'
    },
    {
        width: '150',
        title: '商品会员价/元',
        dataIndex: 'memberprice'
    },
    {
        width: '130',
        title: '商品库存',
        dataIndex: 'sum'
    },
    {
        width: '170',
        title: '商品管理',
        slotName: 'changeInfo'
    }
];

// 数据
const data = reactive({
    goodsData: [],
    goodsInfo: {},
    showCoverLayer: false,
    showInfoCard: false
});

const getGoods = () => {
    getManageGoods().then(res => {
        if (res.data.code === 200) {
            let items = res.data.value;
            for (let i = 0; i < items.length; i ++) {
                items[i].idx = i;
                items[i].imgUrl = 'http://47.94.161.52/img/' + items[i].imgUrl;
                items[i].descr = items[i].descr.replaceAll('\\n', '\n');
            }
            data.goodsData = res.data.value;
        } else {
            Message.info(res.data.msg);
        }
    }).catch(err => {
        console.log(err);
    });
};
getGoods();

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

// 删除商品
const deleteGoods = (idx) => {
    const putObj = data.goodsData[idx].id;
    deleteManageGoods(putObj).then(res => {
        if (res.data.code === 200) {
            Message.info('商品下架成功~');
            nextTick(() => {location.reload();});
        } else {
            Message.info('商品下架失败~');
        }
    }).catch(err => {
        console.log(err);
    });
}

</script>

<template>
    <div class="main-content">
        <a-table
            :style="{letterSpacing: ''}"
            :columns="columns"
            column-resizable
            :data="data.goodsData"
        >
            <template #imgUrl="{ rowIndex }">
                <img :src="data.goodsData[rowIndex].imgUrl" alt="the merchant images" :style="{height: '50px', width: '70px'}" />
            </template>
            <template #changeInfo="{ rowIndex }">
                <div :style="{display: 'flex', justifyContent: 'space-between', paddingRight: '6px'}">
                    <a-button @click="showInfoCard(rowIndex)" id="change-button" class="item-button">修改</a-button>
                    <a-popconfirm @ok="deleteGoods(rowIndex)" content="确定下架该商品吗?" position="left">
                        <a-button class="item-button" status="danger">下架</a-button>
                    </a-popconfirm>
                </div>
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
    letter-spacing: .26rem;
}
#change-button {
    background: rgba(179, 227, 252, 0.7);
}
#change-button:hover {
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