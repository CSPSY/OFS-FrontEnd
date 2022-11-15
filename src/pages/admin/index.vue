<script setup>
import { defineComponent, reactive } from 'vue';
import { Message } from '@arco-design/web-vue';
import { IconCaretLeft, IconGift, IconSafe, IconMenuUnfold, IconDashboard, IconUserGroup } from '@arco-design/web-vue/es/icon';

// data 数据
const data = reactive({
    userInfo: {
        username: 'devleoper'
    },
    navText: {
        first: '用户管理',
        second: '用户信息修改'
    }
});

// nav 显示信息
const infoMap = new Map([
    ['1_1', '用户信息修改'], ['1_2', '用户添加'], ['1_3', '用户删除'],
    ['2', '商品审核'], ['3', '数据统计']
]);

const onClickMenuItem = (key) => {
    data.navText.first = key > '1_3' ? '' : '用户管理';
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
                        <icon-user-group /> 用户管理
                    </template>
                    <a-menu-item key="1_1">用户信息修改</a-menu-item>
                    <a-menu-item key="1_2">用户添加</a-menu-item>
                    <a-menu-item key="1_3">用户删除</a-menu-item>
                </a-sub-menu>
                <a-menu-item key="2">
                    <icon-safe />
                    商品审核
                </a-menu-item>
                <a-menu-item key="3">
                    <icon-dashboard />
                    数据统计
                </a-menu-item>
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
                <a-layout-footer style="letter-spacing: .06rem;">O F S 后台管理系统</a-layout-footer>
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
