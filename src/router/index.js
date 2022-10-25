import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: () => import('../pages/Index.vue'),
        meta: {
            title: '首页'
        } 
    },
    {
        path: '/login',
        component: () => import('../pages/Login.vue'),
        meta: {
            title: '登录'
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
    next()
});

export { router };
