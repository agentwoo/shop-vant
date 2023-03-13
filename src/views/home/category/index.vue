<!-- 分类 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import router from '@/router';

const data = [
    {
        title: '商品分类', path: '/home/allShop', icon: 'cart-o',
    },
    {
        title: '最新商品', path: '/home/newShop', icon: 'bulb-o',
    },
    {
        title: '热门商品', path: '/home/hotShop', icon: 'fire-o',
    },
    {
        title: '免费商品', path: '/home/freeShop', icon: 'gift-o',
    },
]
const toCategory = (path: string) => {
    router.push({
        path: path
    })
}
</script>

<template>
    <div>
        <van-grid :column-num=data.length>
            <van-grid-item :icon=item.icon :text=item.title v-for="item in data" :key="item.path"
                @click="toCategory(item.path)" />
        </van-grid>
    </div>
</template>

<style lang='scss' scoped></style>