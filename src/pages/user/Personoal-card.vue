<script setup>
import { reactive } from 'vue';

const classifyMap = new Map([
    ['pinkpurple', '水果'], ['red', '蔬菜'],
    ['orangered', '肉品'], ['orange', '水产'],
    ['lime', '干货'], ['green', '日配'],
    ['cyan', '熟食'], ['blue', '糕点']
]);

// data 数据
const data = reactive({
    classifyMap
});

const selectPersonal = () => {
    console.log(this)
};
</script>

<template>
        <div class="personal-card" title="个 性 化 设 置">
            <h2 class="title">个性化设置</h2>
            <hr>
            <div :style="{display: 'flex', flexWrap: 'wrap', height: '100%', alignItems: 'center', padding: '16px 6px'}">
                <a-tag
                    class="text"
                    v-for="(value, key) of data.classifyMap"
                    :key="key" :color="value[0]"
                    checkable :default-checked="false"
                    :check="selectPersonal"
                >
                    {{ value[1] }}
                </a-tag>                
            </div>
        </div>
</template>

<style scoped>
.personal-card {
    display: flex;
    flex-direction: column;
    width: 660px;
    height: 340px;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgb(0 0 0 / 3%);
    padding: 2px;
    background: #ffffff;
}
.text {
    width: 25%;
    height: 80px;
    font-size: 1.4rem;
    font-weight: 400;
    opacity: 0.9;
    margin: 12px 0;
    letter-spacing: .6rem;
    justify-content: center;
}
.title {
    padding: 2px;
    font-size: 1.32rem;
    font-weight: 400;
    text-align: center; 
    opacity: 0.6;
    margin: 12px 0;
    letter-spacing: .3rem;
}
</style>