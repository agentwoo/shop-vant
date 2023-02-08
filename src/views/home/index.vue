<!-- 首页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { showSuccessToast, showFailToast } from 'vant';

import router from '@/router';
import Category from '@/views/home/category/index.vue'
import GoodsItem from '@/components/goodsItem/index.vue'
import { useGoodsItemStore, useMenusStore } from '@/store/index'
import { getswiperApi, getallgoodsListApi, } from '@/http/index'


const goodsItemStore = useGoodsItemStore()
const menusStore = useMenusStore()
const data = reactive({
    images: [] as string[],
})

onMounted(async () => {
    // 获取轮播图
    let resswiper = await getswiperApi()
    data.images = resswiper.data[0]
    // 获取所有商品数据
    let resgoods = await getallgoodsListApi()
    goodsItemStore.allGoodsList = resgoods.data


    // 获取商品分类
    // let resgoodskind = await getgoodskindApi()
    // menusStore.menus1 = resgoodskind.data
    // console.log('--------------1111', resgoodskind.data);
})


// 查询待办事项
const search = () => {
    let res = goodsItemStore.searchItem(goodsItemStore.searchVal)
    if (res === 0) return showFailToast('输入不能为空');
    if (res === 1) {
        goodsItemStore.searchRes = []
        router.push({ path: '/search' })
        return showFailToast('暂无该商品');
    }

    goodsItemStore.searchRes = res
    router.push({ path: '/search' })
    showSuccessToast('查找成功');
    goodsItemStore.searchVal = ''
}

</script>

<template>
    <div class="container">
        <van-nav-bar title='首页' fixed />
        <div class="container_search">
            <van-search v-model="goodsItemStore.searchVal" clearable placeholder="请输入搜索关键词" @search="search" />
        </div>
        <div class="container_swiper">
            <van-swipe :autoplay="3000" lazy-render style="height:200px">
                <van-swipe-item v-for="image in data.images" :key="image">
                    <img :src="image" style="width: 100%;" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="container_recommend">推荐商品</div>
        <Category></Category>
        <div class="container_layout">
            <!-- <GoodsItem :goodsItemDesc="goodsItemStore.stateOneGoodsList$"></GoodsItem> -->
            <GoodsItem :goodsItemDesc="goodsItemStore.allGoodsList"></GoodsItem>
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