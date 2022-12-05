import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: '首页',
        component: () => import('../pages/Index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login-user',
        name: '一般用户登录',
        component: () => import('../pages/user/Login-user.vue'),
        meta: {
            title: '用户登录'
        }
    },
    {
        path: '/register-user',
        name: '用户注册',
        component: () => import('../pages/user/Register-user.vue'),
        meta: {
            title: '用户注册'
        }
    },
    {
        path: '/user/shopping-cart',
        name: '购物车',
        component: () => import('../pages/user/Shopping-cart.vue'),
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/user/payment',
        name: '支付',
        component: () => import('../pages/user/Payment.vue'),
        meta: {
            title: '支付'
        }
    },
    {
        path: '/user/pay',
        name: '付款',
        component: () => import('../pages/user/Pay.vue'),
        meta: {
            title: '付款'
        }
    },
    {
        path: '/login-merchant',
        name: '商家登录',
        component: () => import('../pages/merchant/Login-merchant.vue'),
        meta: {
            title: '商家后台登录'
        }
    },
    {
        path: '/register-merchant',
        name: '商家注册',
        component: () => import('../pages/merchant/Register-merchant.vue'),
        meta: {
            title: '商家注册'
        }
    },
    {
        path: '/merchant/management',
        name: '商品管理',
        component: () => import('../pages/merchant/Index.vue'),
        meta: {
            title: '商品管理'
        }
    },
    {
        path: '/login-admin',
        name: '管理员登录',
        component: () => import('../pages/admin/Login-admin.vue'),
        meta: {
            title: '管理员登录'
        }
    },
    {
        path: '/register-admin',
        name: '管理员注册',
        component: () => import('../pages/admin/Register-admin.vue'),
        meta: {
            title: '管理员注册'
        }
    },
    {
        path: '/admin/management',
        name: '后台管理系统',
        component: () => import('../pages/admin/Index.vue'),
        meta: {
            title: '后台管理系统'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // 路由发送变化时，更改页面 title
    if (to.meta.title) {
        document.title = 'OFS | ' + to.meta.title
    }
    next();
});

export { router };
