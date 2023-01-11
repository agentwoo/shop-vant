<!-- 商品详情 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useGoodsItemStore } from '@/store/index'

const route = useRoute()
const router = useRouter()
const goodsItemStore = useGoodsItemStore()
const data = reactive({
    item: {
        goods_id: '',
        imgUrl: '',
        swiper_img: [
            { img: '' }
        ],
        goods_title: '',
        goods_desc: '',
        present_price: '',
        origin_price: '',
        views: '',
        kind: '',
        pub_time: '',
        is_collect: '',
    }
})

watch(() => route.params, newVal => {
    const item = goodsItemStore.goodsItem.find((v) => v.goods_id === newVal.id)
    if (item) {
        data.item = item;
    }
}, {
    immediate: true
})

const onClickLeft = () => {
    router.back()
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="收藏" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_goodsDesc">
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="item in data.item.swiper_img" :key=item.img>
                    <img :src="item.img" alt="轮播图" style="width:100%;height: 40vh;">
                </van-swipe-item>
            </van-swipe>
            <div class="container_goodsDesc_pirce">
                <span>￥{{ data.item.present_price }}</span>
                <span>原价￥{{ data.item.origin_price }}</span>
                <span>发布时间{{ data.item.pub_time }}</span>
            </div>
            <div class="van-ellipsis">{{ data.item.goods_title }}</div>
            <div class="van-multi-ellipsis--l3">
                {{ data.item.goods_desc }}
            </div>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
            <van-action-bar-button type="danger" text="购买" />
        </van-action-bar>
    </div>
</template>

<style lang='scss' scoped>
.container {

    &_goodsDesc_pirce {
        height: 60px;
        line-height: 60px;
        width: 100%;
        background-color: white;
        border-bottom: 1px solid rgb(202, 196, 196);
        border-top: 1px solid rgb(202, 196, 196);

        span:nth-child(1) {
            color: red;
            font-size: 20px;
            font-weight: 700;
            margin-left: 5px;
        }

        span:nth-child(2) {
            text-decoration: line-through;
            color: rgb(198, 196, 196);
            margin-left: 20px;
        }

        span:nth-child(3) {
            position: relative;
            left: -130px;
            top: 20px;
        }
    }

    .van-ellipsis {
        height: 6vh;
        width: 100%;
        background-color: white;
        font-size: 15px;
    }

    .van-multi-ellipsis--l3 {
        height: 70px;
        width: 100%;
        font-size: 15px;
        background-color: white;
        border-top: 1px solid rgb(202, 196, 196);
    }
}
</style>