<!-- 商品详情 -->
<script lang='ts' setup>
import { reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { showSuccessToast, showFailToast, showConfirmDialog } from 'vant';
import { getgoodsdescApi, buygoodsitemApi, addcollectgoodsApi } from '@/http/index'
import { useUserStore } from '@/store/index'

const userStore = useUserStore()
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

// 购买商品
async function getGoodsItem(goods_id: number) {
    let res = await buygoodsitemApi({ goods_id: goods_id })
    if (res.ok) {
        showSuccessToast('下单成功，联系卖家发货！')
        router.push({
            path: '/userCenter/getGoods'
        })
    }
}
const confirmbuygoods = (goods_id: number) => {
    if (Object.keys(userStore.user).length === 0 && Object.keys(userStore.token).length === 0) return showFailToast('请先登录！')
    if (data.item.pub_user_id === userStore.user.user_id) return showFailToast('不能购买自己发布的商品')
    showConfirmDialog({
        title: '提示',
        message:
            '预约购买成功后，您将获得卖家的联系方式，请及时与卖家取得联系，进行线下当面付款交易。注意:该产品在您预约购买后，会自动下架，您是该产品的唯一买家。',
    }).then(() => {
        getGoodsItem(goods_id)
    }).catch(() => {
        showFailToast('取消下单！')
    });
}

// 加入收藏
async function addcollectgoods(goods_id: number) {
    if (Object.keys(userStore.user).length === 0 && Object.keys(userStore.token).length === 0) return showFailToast('请先登录！')
    if (data.item.pub_user_id === userStore.user.user_id) return showFailToast('不能收藏自己发布的商品')

    let res = await addcollectgoodsApi({ goods_id: goods_id })
    if (res.ok) showFailToast(res.message)
    showSuccessToast(res.message)
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
                <span>上架时间：{{ data.item.goods_pub_time.slice(0, 10) }}</span>
            </div>
            <div class="van-ellipsis">{{ data.item.goods_title }}</div>
            <div class="van-multi-ellipsis--l3">
                {{ data.item.goods_desc }}
            </div>
        </div>
        <van-action-bar>
            <van-action-bar-button type="danger" text="加入收藏" @click="addcollectgoods(data.item.goods_id)" />
            <van-action-bar-button type="danger" text="购买" @click="confirmbuygoods(data.item.goods_id)" />
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
            margin-right: 20px;
            display: flex;
            justify-content: end;
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