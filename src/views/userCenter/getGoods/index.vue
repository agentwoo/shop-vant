<!-- 订单列表 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { useGoodsItemStore } from '@/store/index'
import { IgoodsDesc } from '@/utils/store'

const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.push({
        path: "/userCenter"
    })
}

// 取消订单
const cancelOrder = (item: IgoodsDesc) => {
    let index = goodsItemStore.goodsItem.findIndex(v => v.goods_id === item.goods_id)
    let index2 = goodsItemStore.orderGoodsList.findIndex(v => v.goods_id === item.goods_id)
    if (index === -1 || index2 === -1) return showFailToast('出现错误！')
    goodsItemStore.goodsItem.splice(index, 1, { ...item, order_states: '1' })
    goodsItemStore.orderGoodsList.splice(index2, 1)
    showSuccessToast('成功取消')
}

// 确认收货
const confirmOrder = (item: IgoodsDesc) => {
    let index = goodsItemStore.goodsItem.findIndex(v => v.goods_id === item.goods_id)
    let index2 = goodsItemStore.orderGoodsList.findIndex(v => v.goods_id === item.goods_id)
    if (index === -1 || index2 === -1) return showFailToast('出现错误！')
    goodsItemStore.goodsItem.splice(index, 1, { ...item, order_states: '4' })
    goodsItemStore.orderGoodsList.splice(index2, 1)
    goodsItemStore.finishedOrderGoodsList.unshift({ ...item, order_states: '4' })
    showSuccessToast('确认收货')
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="订单列表" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.orderGoodsList.length !== 0" class="container_order">
            <div v-for="item in goodsItemStore.orderGoodsList" :key="item.goods_id" class="container_order_card">
                <van-card :price=item.present_price :desc=item.goods_desc :title=item.goods_title :thumb=item.imgUrl>
                    <template #footer>
                        <van-button size="mini" @click="cancelOrder(item)" v-if="item.order_states === '2'">
                            取消订单
                        </van-button>
                        <van-button size="mini" @click="confirmOrder(item)" v-if="item.order_states === '2'">
                            确认收货
                        </van-button>
                        <!-- <van-button size="mini" @click="confirmOrder(item)" v-if="item.order_states === '3'">
                            确认收货
                        </van-button> -->
                    </template>
                </van-card>
            </div>
        </div>
        <div v-if="goodsItemStore.finishedOrderGoodsList.length !== 0" class="container_finishedOrder">
            <van-divider>历史订单</van-divider>
            <div v-for="item in goodsItemStore.finishedOrderGoodsList" :key="item.goods_id"
                class="container_finishedOrder_card">
                <van-card tag="已完成" :price=item.present_price :desc=item.goods_desc :title=item.goods_title
                    :thumb=item.imgUrl :origin-price=item.origin_price />
            </div>
        </div>
        <div v-if="goodsItemStore.orderGoodsList.length === 0 && goodsItemStore.finishedOrderGoodsList.length == 0"
            class="container_empty">
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
        margin-top: 10vh;

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