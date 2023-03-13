<!-- 首页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'

import router from '@/router';
import Category from '@/views/home/category/index.vue'
import GoodsItem from '@/components/goodsItem/index.vue'
import { useGoodsItemStore } from '@/store/index'
import { getallgoodsrandListApi, getswiperApi } from '@/http/index'


import { Igoods, Iswiper } from '@/utils/store'

const goodsItemStore = useGoodsItemStore()
const data = reactive({
    searchVal: '',
    swiper: [] as Iswiper[],
    goodsrandList: [] as Igoods[],
})

// 获取当前时间戳
let nowtimestamp = new Date().getTime()
let logintimestamp = localStorage.getItem('logintimestamp')
// token过期时间
let timeout = 1000 * 60 * 60 * 24

onMounted(async () => {
    // 获取轮播图
    let res = await getswiperApi()
    if (!res.ok) return res.cc(res.message)
    data.swiper = res.data


    // 获取所有商品数据
    let resgoods = await getallgoodsrandListApi()
    data.goodsrandList = resgoods.data

    // 如果token过期，则删除本地存储的用户数据
    if (logintimestamp) {
        if (nowtimestamp - Number(logintimestamp) >= timeout) {
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
            localStorage.removeItem('logintimestamp')
        }
    }
})


async function search(searchVal: string) {
    router.push({
        query: { searchVal },
        path: '/search'
    })
}




</script>

<template>
    <div class="container">
        <van-nav-bar title='首页' fixed />
        <div class="container_search">
            <van-search v-model="data.searchVal" clearable placeholder="请输入搜索关键词" @search="search(data.searchVal)" />
        </div>
        <div class="container_swiper">
            <van-swipe :autoplay="3000" lazy-render style="height:200px">
                <van-swipe-item v-for="item in data.swiper" :key="item.swiper_id">
                    <img :src="item.swiper_url" style="width: 100%;" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="container_recommend">推荐商品</div>
        <Category></Category>
        <div class="container_layout">
            <GoodsItem :goodsItemDesc="data.goodsrandList"></GoodsItem>
        </div>
        <van-divider>没有更多了</van-divider>
    </div>
</template>

<style lang='scss' scoped>
.container {
    padding-bottom: 50px;

    &_search {
        margin-top: 50px;
    }

    &_recommend {
        height: 50px;
        line-height: 50px;
        background-color: #68A1D9;
        color: white;
        text-align: center;
        font-size: 20px;
        font-weight: 400;
        border-bottom: 1px solid white;
    }

    &_layout {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 1vh;
        padding: 0 2.5vw;
    }
}
</style>