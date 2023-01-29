<!-- 商品详情 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { useGoodsItemStore } from '@/store/index'
import { IgoodsDesc } from '@/utils/store'


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
        order_states: '',
    }
})

const goodsId = ref()
watch(() => route.params, newVal => {
    const item = goodsItemStore.goodsItem.find((v) => v.goods_id === newVal.id)
    goodsId.value = newVal.id
    if (item) {
        data.item = item;
    }
}, {
    immediate: true
})

// 获取商品是否被购买并给icon赋予初始值
let item = goodsItemStore.goodsItem.find(v => v.goods_id === goodsId.value)
let isCollect = item?.is_collect
let iconDate = ref('star-o')
let text = ref('收藏')
if (isCollect === '0') {
    iconDate.value = 'star-o'
    text.value = '收藏'
} else {
    iconDate.value = 'star'
    text.value = '已收藏'
}

// 添加、取消收藏
async function collect(item: IgoodsDesc) {
    const collect = item.is_collect === '1' ? '0' : '1'
    let index = goodsItemStore.goodsItem.findIndex(v => v.goods_id === item.goods_id)
    if (index === -1) return showFailToast('添加失败');
    // 更改原始数据中的collect状态
    goodsItemStore.goodsItem.splice(index, 1, { ...item, is_collect: collect })

    // 添加到收藏列表里
    let index1 = goodsItemStore.collectGoodsList.findIndex(v => v.goods_id === item.goods_id)
    if (index1 === -1) {
        goodsItemStore.collectGoodsList.unshift({ ...item, is_collect: collect })
    } else {
        goodsItemStore.collectGoodsList.splice(index1, 1)
    }

    // 动态绑定icon
    if (iconDate.value === 'star-o') {
        iconDate.value = 'star'
        text.value = '已收藏'
        showSuccessToast('收藏成功');
    } else {
        iconDate.value = 'star-o'
        text.value = '收藏'
        showSuccessToast('取消收藏');
    }
}

const onClickLeft = () => {
    router.back()
}

// 购买商品
async function getGoodsItem(item: IgoodsDesc) {
    let index = goodsItemStore.goodsItem.findIndex(v => v.goods_id === item.goods_id)
    if (index === -1) return showFailToast('添加失败！')
    goodsItemStore.orderGoodsList.unshift({ ...item, order_states: '2' })
    goodsItemStore.goodsItem.splice(index, 1, { ...item, order_states: '2' })
    showSuccessToast('下单成功，请联系卖家取货')
    router.push({ path: '/userCenter/getGoods' })
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
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
            <van-action-bar-icon v-bind:icon="iconDate" v-bind:text="text" @click="collect(data.item)"
                color="#ff5000" />
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