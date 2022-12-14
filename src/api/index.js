import axios from 'axios';

const API = axios.create({
    baseURL: 'http://47.94.161.52/ofs'
});

const APIWithJson = axios.create({
    baseURL: 'http://47.94.161.52/ofs'
});

// 请求前检测是否有 token，并携带
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = localStorage.getItem('token');
        req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return req;
});

APIWithJson.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = localStorage.getItem('token');
    }
    return req;
});

const APIWithoutToken = axios.create({
    baseURL: 'http://47.94.161.52/ofs'
});

const APINoTokenForm = axios.create({
    baseURL: 'http://47.94.161.52/ofs'
})

APINoTokenForm.interceptors.request.use((req) => {
    req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return req;
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

// 分类商品展示
const getClassMerchants = (getObj) => {
    return APIWithoutToken.get('/category/getProByCat/' + getObj);
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
    return APIWithJson.post('/salesOrder/generate', postObj);
};

// 支付页面，地址选项
const getOrderAddr = () => {
    return API.get('/salesOrder/addr');
};

const payOrderMoney = (postObj) => {
    return API.post('/salesOrder/confirm', postObj);
};

// 商家获取商品列表
const getManageGoods = () => {
    return API.get('/pro/getShop');
};

// 商家删除商品
const deleteManageGoods = (putObj) => {
    return API.put('/pro/del/' + putObj);
};

// 更新商品
const updateManageGoods = (postObj) => {
    return API.post('/pro/update', postObj);
}

// 注册
// 发送邮箱验证码
const sendCaptcha = (postObj) => {
    return APINoTokenForm.post('/api/generate-code', postObj);
};

// 获取后台邮箱验证码
const getCaptcha = (postObj) => {
    return APINoTokenForm.post('/api/query-code', postObj);
};

// 发送注册信息
const sendRegisterInfo = (postObj) => {
    return APIWithoutToken.post('/register', postObj);
};


export { sendLoginInfo, sendLogout };
export { sendCaptcha, getCaptcha, sendRegisterInfo };
export { judgeToken, getMerchantsItems, addItemsToShCart, searchMerchant, getClassMerchants };
export { getShoppingCart, addSalesOrder };
export { getOrderAddr, payOrderMoney };
export { getManageGoods, deleteManageGoods, updateManageGoods };