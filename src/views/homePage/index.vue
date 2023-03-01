<!-- 首页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import { RouterView, useRoute } from 'vue-router';
import router from '@/router';
import { useUserStore } from '@/store/index'
import { showFailToast } from 'vant';


const userStore = useUserStore()
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
    if (path === '/pubGoods') {
        if (Object.keys(userStore.user).length === 0 && Object.keys(userStore.token).length === 0) return showFailToast('请先登录！')
    }
    router.push({
        path: path
    })
}
</script>

<template>
    <RouterView></RouterView>
    <div class="tabbar">
        <van-tabbar v-model="active">
            <van-tabbar-item :name=item.name :icon=item.icon v-for="item in data" :key="item.name"
                @click="toNavigate(item.path)">
                {{ item.title }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style lang='scss' scoped>
.tabbar {
    :deep(.van-tabbar--fixed) {
        margin-bottom: -1px;
    }
}
</style>