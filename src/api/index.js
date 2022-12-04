import axios from 'axios';
import Qs from 'qs';

const API = axios.create({
    // 本地 mock URL
    baseURL: 'http://47.94.161.52'
});

// 请求前检测是否有 token，并携带
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = localStorage.getItem('token');
        req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return req;
});

const APIWithoutToken = axios.create({
    baseURL: 'http://47.94.161.52'
});

const sendLoginInfo = (postObj) => {
    return APIWithoutToken.post('/api/login', postObj);
};

const sendLogout = () => {
    return API.post('/api/logout');
}

// 判断 token 有效性
const judgeToken = (postObj) => {
    return API.post('/validate', postObj);
};

// 首页页面商品数据
const getMerchantsItems = () => {
    return APIWithoutToken.get('/pro/home');
};

// 购物车展示
const getShoppingCart = () => {
    return API.get('/pro/shoppingCar');
};

// 加入购物车
const addItemsToShCart = (postObj) => {
    return API.post('/pro/addToShoppingCar', postObj);
};

// 搜索商品
const searchMerchant = (getObj) => {
    return APIWithoutToken.get('/pro/search/' + getObj);
};

// 购物车页面，立即购买，添加订单
const addSalesOrder = (postObj) => {
    return API.post('/salesOrder/generate', postObj);
};

export { sendLoginInfo, sendLogout };
export { judgeToken, getMerchantsItems, addItemsToShCart, searchMerchant };
export { getShoppingCart, addSalesOrder };