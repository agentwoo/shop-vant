<!-- 订单列表 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { useGoodsItemStore } from '@/store/index'
import { IgoodsDesc } from '@/utils/store'
import {
    gettradeordergoodsApi,
    getshippedordergoodsApi,
    getfinishordergoodsApi,
    cancelordergoodsApi,
    confirmordergoodsApi
} from '@/http/index'




const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.push({
        path: "/userCenter"
    })
}

// 取消订单
async function cancelOrder(goods_id: number) {
    let res = await cancelordergoodsApi({ goods_id: goods_id })
    if (res.ok) showSuccessToast('取消成功！')
    let index = goodsItemStore.tradeordergoods.findIndex(v => v.goods_id === goods_id)
    goodsItemStore.tradeordergoods.splice(index, 1)
}



// 确认收货
async function confirmOrder(goods_id: number) {
    let res = await confirmordergoodsApi({ goods_id: goods_id })
    if (res.ok) showSuccessToast('收货成功！')
    // 将商品添加到已完成订单列表
    let item = goodsItemStore.shippedordergoods.find(v => v.goods_id === goods_id)
    if (!item) return showFailToast('系统繁忙！')
    goodsItemStore.finishedOrderGoodsList.push(item)
    // 将商品从订单列表移除
    let index = goodsItemStore.shippedordergoods.findIndex(v => v.goods_id === goods_id)
    goodsItemStore.shippedordergoods.splice(index, 1)
}


onMounted(async () => {
    // 获取已发货商品订单列表
    let res = await gettradeordergoodsApi()
    if (!res.ok) showFailToast('系统繁忙！')
    goodsItemStore.tradeordergoods = res.data
    // 获取待发货商品订单列表
    let resshipped = await getshippedordergoodsApi()
    goodsItemStore.shippedordergoods = resshipped.data
    // 获取已完成商品订单
    let finishres = await getfinishordergoodsApi()
    if (!finishres.ok) showFailToast('系统繁忙！')
    goodsItemStore.finishedOrderGoodsList = finishres.data
})

</script>

<template>
    <div class="container">
        <van-nav-bar title="订单列表" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.tradeordergoods.length !== 0" class="container_order">
            <van-divider>待发货</van-divider>
            <div v-for="item in goodsItemStore.tradeordergoods" :key="item.goods_id" class="container_order_card">
                <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                    :thumb=item.goods_title_img>
                    <template #footer>
                        <van-button size="mini" @click="cancelOrder(item.goods_id)" v-if="item.goods_status === '2'">
                            取消订单
                        </van-button>
                    </template>
                </van-card>
            </div>
        </div>
        <div v-if="goodsItemStore.shippedordergoods.length !== 0" class="container_order">
            <van-divider>已发货</van-divider>
            <div v-for="item in goodsItemStore.shippedordergoods" :key="item.goods_id" class="container_order_card">
                <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                    :thumb=item.goods_title_img>
                    <template #footer>
                        <van-button size="mini" @click="confirmOrder(item.goods_id)" v-if="item.goods_status === '3'">
                            确认收货
                        </van-button>
                    </template>
                </van-card>
            </div>
        </div>
        <div v-if="goodsItemStore.finishedOrderGoodsList.length !== 0" class="container_finishedOrder">
            <van-divider>历史订单</van-divider>
            <div v-for="item in goodsItemStore.finishedOrderGoodsList" :key="item.goods_id"
                class="container_finishedOrder_card">
                <van-card tag="已完成" :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                    :thumb=item.goods_title_img />
            </div>
        </div>
        <div v-if="goodsItemStore.tradeordergoods.length === 0 && goodsItemStore.finishedOrderGoodsList.length == 0
        && goodsItemStore.shippedordergoods.length === 0" class="container_empty">
            <van-empty description="暂无订单" />
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    &_order {
        margin-top: 50px;

        &_card {
            margin-top: 1vh;

            :deep(.van-card) {
                background-color: white;
            }
        }
    }

    &_finishedOrder {
        // margin-top: 10vh;

        &_card {
            margin-top: 1vh;

            :deep(.van-card) {
                background-color: white;
            }
        }
    }

    &_empty {
        :deep(.van-empty) {
            margin-top: 20vh;
        }
    }
}

.goods-card {
    margin: 0;
    background-color: white;
}

.delete-button {
    height: 100%;
}
</style>