// 虚拟数据
const images = [
    '/src/assets/imgs/cake.jpg',
    '/src/assets/imgs/cherry.jpg',
    '/src/assets/imgs/lemon.jpg',
    '/src/assets/imgs/orange.jpg',
    '/src/assets/imgs/peach.jpg',
    '/src/assets/imgs/pear.jpg',
    '/src/assets/imgs/pizza.jpg',
    '/src/assets/imgs/tabasco.jpg'
];

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

const paymentData = [
    {
        key: '1',
        name: '樱桃蛋糕',
        imgAdr: '/src/assets/imgs/cake.jpg',
        price: '35.7',
        cnts: '1'
    },
    {
        key: '2',
        name: '桃子',
        imgAdr: '/src/assets/imgs/peach.jpg',
        price: '16.8',
        cnts: '1'
    },
    {
        key: '3',
        name: '芝士披萨',
        imgAdr: '/src/assets/imgs/pizza.jpg',
        price: '42.6',
        cnts: '1'
    },
    {
        key: '4',
        name: '墨西哥三明治',
        imgAdr: '/src/assets/imgs/tabasco.jpg',
        price: '9.6',
        cnts: '2'
    },
    {
        key: '5',
        name: '车厘子',
        imgAdr: '/src/assets/imgs/cherry.jpg',
        price: '45.7',
        cnts: '2'
    }
];

// address
const address = [
    "广东省深圳市南山区南山街道翠庐",
    "广东省深圳市南山区西丽街道留仙公馆",
    "广东省深圳市龙岗区公园大地",
    "广东省深圳市大鹏新区万科十七英里"
]

const financialBin = (x) => {
    return Number.parseFloat(x).toFixed(2);
}

const payImg = "/public/pay.png";

export { images, itemsData, paymentData, financialBin, payImg, address };