<!-- 首页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import router from '@/router';


const active = ref('/home');
const data = [
    {
        icon: 'home-o', name: '/home', path: '/home', title: '首页',
    },
    {
        icon: 'add-o', name: '/pubGoods', path: '/pubGoods', title: '发布',
    },
    {
        icon: 'friends-o', name: '/userCenter', path: '/userCenter', title: '我的',
    },
]
const route = useRoute()
watch(() => route.path, newVal => {
    active.value = newVal
}, {
    immediate: true
})

const toNavigate = (path: string) => {
    router.push({
        path: path
    })
}
</script>

<template>
    <div class="container">
        <RouterView></RouterView>
        <van-tabbar v-model="active">
            <van-tabbar-item :name=item.name :icon=item.icon v-for="item in data" :key="item.name"
                @click="toNavigate(item.path)">
                {{ item.title }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang='scss' scoped>

</style>