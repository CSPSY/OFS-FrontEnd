<script setup>
import { defineComponent, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconCaretLeft, IconGift, IconCalendar, IconMenuUnfold } from '@arco-design/web-vue/es/icon';

// data 数据
const data = reactive({
    userInfo: {
        username: 'devleoper'
    },
    navText: {
        first: '商品管理',
        second: '商品信息修改'
    }
});

// nav 显示信息
const infoMap = new Map([
    ['1_1', '商品信息修改'], ['1_2', '商品分类'], ['1_3', '商品添加'], ['1_4', '商品下架'],
    ['2_1', '订单修改'], ['2_2', '订单撤销']
]);

const onClickMenuItem = (key) => {
    data.navText.first = key > '1_4' ? '订单管理' : '商品管理';
    data.navText.second = infoMap.get(key);
};
</script>

<template>
    <a-layout class="layout-demo">
        <a-layout-sider collapsible breakpoint="xl">
            <div class="logo">O F S</div>
            <a-menu
                :defaultOpenKeys="['1']"
                :default-selected-keys="['1_1']"
                :style="{ width: '100%' }"
                @menu-item-click="onClickMenuItem"
            >
                <a-sub-menu key="1">
                    <template #title>
                        <IconGift></IconGift> 商品管理
                    </template>
                    <a-menu-item key="1_1">商品信息修改</a-menu-item>
                    <a-menu-item key="1_2">商品分类</a-menu-item>
                    <a-menu-item key="1_3">商品添加</a-menu-item>
                    <a-menu-item key="1_4">商品下架</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="2">
                    <template #title>
                        <IconCalendar></IconCalendar> 订单管理
                    </template>
                    <a-menu-item key="2_1">订单修改</a-menu-item>
                    <a-menu-item key="2_2">订单撤销</a-menu-item>
                    <!-- <a-menu-item key="2_3">订单增加</a-menu-item> -->
                </a-sub-menu>
            </a-menu>
            <!-- trigger -->
            <template #trigger="{ collapsed }">
                <icon-menu-unfold v-if="collapsed" />
                <IconCaretLeft v-else></IconCaretLeft>
            </template>
        </a-layout-sider>
        
        <a-layout>
            <a-layout-header style="padding-left: 20px; font-size: 1.12rem;">
                Hi！ {{data.userInfo.username}}
            </a-layout-header >
            <a-layout style="padding: 0 14px;">
                <a-breadcrumb :style="{ margin: '16px 0' }">
                    <a-breadcrumb-item v-if="data.navText.first">{{data.navText.first}}</a-breadcrumb-item>
                    <a-breadcrumb-item v-if="data.navText.second">{{data.navText.second}}</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content>Content</a-layout-content>
                <a-layout-footer>O F S 商家管理平台</a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>

<style scoped>
.layout-demo {
    height: 100vh;
    background: var(--color-fill-2);
    border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider) .logo {
    font-size: 1.6rem;
    font-weight: 200;
    text-align: center;
    opacity: 0.6;
    line-height: 32px;
    height: 32px;
    letter-spacing: .3rem;
    
    margin: 12px 8px;
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
    background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
    height: 64px;
    line-height: 64px;
    background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
    height: 48px;
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
    color: var(--color-text-2);
    font-weight: 400;
    font-size: 14px;
    background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1rem;
    font-stretch: condensed;
    text-align: center;
}
</style>
