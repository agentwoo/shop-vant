<!-- 获取卖家联系方式 -->
<script lang='ts' setup>
import { reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { getgoodsdescApi } from '@/http/index'

const route = useRoute()
const router = useRouter()
const data = reactive({
    item: {
        goods_id: 0,
        goods_title: '',
        goods_desc: "",
        goods_origin_price: "",
        goods_present_price: "",
        goods_title_img: "",
        goods_contact: "",
        goods_pid: 0,
        goods_kind: "",
        goods_pub_time: "",
        goods_views: "",
        is_delgoods: "",
        goods_status: "",
        pub_user_id: 0,
        goods_swiper_img1: "",
        goods_swiper_img2: "",
        goods_swiper_img3: "",
        goods_swiper_img4: ""
    },
    id: ''
})


watch(() => route.params, (newVal) => {
    data.id = newVal.id as string
}, {
    immediate: true,
})

onMounted(async () => {
    let resgoodsdesc = await getgoodsdescApi({ goods_id: data.id })
    data.item = resgoodsdesc.data[0]
})


const onClickLeft = () => {
    router.back()
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_goodsDesc">
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item>
                    <img :src="data.item.goods_swiper_img1" alt="轮播图" style="width:100%;height: 40vh;">
                </van-swipe-item>
                <van-swipe-item>
                    <img :src="data.item.goods_swiper_img2" alt="轮播图" style="width:100%;height: 40vh;">
                </van-swipe-item>
                <van-swipe-item>
                    <img :src="data.item.goods_swiper_img3" alt="轮播图" style="width:100%;height: 40vh;">
                </van-swipe-item>
                <van-swipe-item>
                    <img :src="data.item.goods_swiper_img4" alt="轮播图" style="width:100%;height: 40vh;">
                </van-swipe-item>
            </van-swipe>
            <div class="container_goodsDesc_pirce">
                <span>￥{{ data.item.goods_origin_price }}</span>
                <span>原价￥{{ data.item.goods_present_price }}</span>
                <span>发布时间：{{ data.item.goods_pub_time.slice(0, 10) }}</span>
            </div>
            <div class="van-ellipsis">{{ data.item.goods_title }}</div>
            <div class="van-multi-ellipsis--l3">
                {{ data.item.goods_desc }}
            </div>
            <div class="van-multi-ellipsis--l3">
                {{ data.item.goods_contact }}
            </div>
        </div>
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
            display: flex;
            justify-content: end;
            margin-right: 20px;
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