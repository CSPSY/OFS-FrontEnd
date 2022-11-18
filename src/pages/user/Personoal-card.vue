<script setup>
import { IconThumbUp, IconShareInternal, IconMore } from '@arco-design/web-vue/es/icon';
import { reactive } from 'vue';

const itemsData = [
    {
        id: '1',
        name: '樱桃蛋糕',
        imgAdr: '/src/assets/imgs/cake.jpg',
        desc: `这个美味的蛋糕，美味的蛋糕，美味的蛋糕\n有着樱桃，有着樱桃\n有着巧克力`,
        price: '35.7',
        memberPrice: '29.8'
    },
    {
        id: '2',
        name: '车厘子',
        imgAdr: '/src/assets/imgs/cherry.jpg',
        desc: `这个美味的车厘子，美味的车厘子，美味的车厘子\n刚刚采摘，刚刚采摘\n颗颗饱满`,
        price: '45.7',
        memberPrice: '42.4'
    },
    {
        id: '3',
        name: '大鸭梨',
        imgAdr: '/src/assets/imgs/lemon.jpg',
        desc: `这个美味的鸭梨，美味的鸭梨，美味的鸭梨\n刚刚采摘，刚刚采摘\n清甜可口`,
        price: '35.7',
        memberPrice: '0'
    },
    {
        id: '4',
        name: '橘子',
        imgAdr: '/src/assets/imgs/orange.jpg',
        desc: `这个美味的橘子，美味的橘子，美味的橘子\n刚刚采摘，刚刚采摘\n个大包甜`,
        price: '15.7',
        memberPrice: '12.8'
    },
    {
        id: '5',
        name: '桃子',
        imgAdr: '/src/assets/imgs/peach.jpg',
        desc: `这个美味的桃子，美味的桃子，美味的桃子\n刚刚采摘，刚刚采摘\n清甜可口`,
        price: '16.8',
        memberPrice: '15.2'
    },
    {
        id: '6',
        name: '早酥梨',
        imgAdr: '/src/assets/imgs/pear.jpg',
        desc: `这个美味的早酥梨，美味的早酥梨，美味的早酥梨\n刚刚采摘，刚刚采摘\n清甜可口`,
        price: '12.6',
        memberPrice: '11.1'
    },
    {
        id: '7',
        name: '芝士披萨 ',
        imgAdr: '/src/assets/imgs/pizza.jpg',
        desc: `这个美味的披萨，美味的披萨，美味的披萨\n现烤现卖，现烤现卖\n好吃量足`,
        price: '42.6',
        memberPrice: '39.8'
    },
    {
        id: '8',
        name: '墨西哥三明治',
        imgAdr: '/src/assets/imgs/tabasco.jpg',
        desc: `这个美味的三明治，美味的三明治，美味的三明治\n有着芝士，有着鸡蛋\n有着培根`,
        price: '9.6',
        memberPrice: '8.2'
    }
];

// data 数据
const data = reactive({
    items: itemsData
});

</script>

<template>
    <a-card :style="{ width: '460px' }">
    <template #actions>
        <span class="icon-hover"> <IconThumbUp /> </span>
        <span class="icon-hover"> <IconShareInternal /> </span>
        <span class="icon-hover"> <IconMore /> </span>
    </template>
    <template #cover>
    <div
        :style="{
            height: '22 0px',
            overflow: 'hidden',
        }"
    >
        <img
            :style="{ width: '100%', height: '100%' }"
            alt="dessert"
            :src="data.items[0].imgAdr"
        />
    </div>
    </template>
    <a-card-meta title="Card Title" description="This is the description">
    <template #avatar>
        <div
            :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
        >
            <a-avatar :size="24" :style="{ marginRight: '8px' }">
                A
            </a-avatar>
            <a-typography-text>Username</a-typography-text>
        </div>
    </template>
    </a-card-meta>
</a-card>
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
</style>