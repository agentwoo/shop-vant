<!-- 首页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import Category from '@/views/home/category/index.vue'
import GoodsItem from '@/components/goodsItem/index.vue'
import { useGoodsItemStore } from '@/store/index'


const goodsItemStore = useGoodsItemStore()
const value = ref('');
const images = [
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
];

</script>

<template>

    <div class="container">
        <van-nav-bar title='首页' fixed />
        <div class="container_search">
            <van-search v-model="value" placeholder="请输入搜索关键词" />
        </div>
        <div class="container_swiper">
            <van-swipe :autoplay="3000" lazy-render style="height:200px">
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="image" style="width: 100%;" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="container_recommend">推荐商品</div>
        <Category></Category>
        <div class="container_layout">
            <GoodsItem :goodsItemDesc="goodsItemStore.goodsItem"></GoodsItem>
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