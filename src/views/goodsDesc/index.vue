<!-- 商品详情 -->
<script lang='ts' setup>
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { useGoodsItemStore } from '@/store/index'
import { Igoods } from '@/utils/store'



import { getgoodsdescApi } from '@/http/index'


const route = useRoute()
const router = useRouter()
const goodsItemStore = useGoodsItemStore()
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
})





watch(() => route.params, (newVal) => {
    const item = goodsItemStore.allGoodsList.find(v => v.goods_id === Number(newVal.id))
    if (item) {
        data.item = item
    }
    // let goodsid = String(newVal.id)
    // getgoodsdesc(goodsid)
}, {
    immediate: true,
})

// async function getgoodsdesc(goodsid: string) {
//     console.log('--', goodsid);

//     let resgoodsdesc = await getgoodsdescApi({ goods_id: goodsid })
//     console.log('----------------', resgoodsdesc);
// }




const onClickLeft = () => {
    router.back()
}

// 购买商品
async function getGoodsItem(item: Igoods) {

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
                <span>发布时间{{ data.item.goods_pub_time }}</span>
            </div>
            <div class="van-ellipsis">{{ data.item.goods_title }}</div>
            <div class="van-multi-ellipsis--l3">
                {{ data.item.goods_desc }}
            </div>
        </div>
        <van-action-bar>
            <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
            <van-action-bar-button type="danger" text="购买" @click="getGoodsItem(data.item)" />
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