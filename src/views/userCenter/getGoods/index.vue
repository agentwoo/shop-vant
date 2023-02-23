<!-- 订单列表 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast, showConfirmDialog } from 'vant';
import { useGoodsItemStore } from '@/store/index'
import {
    gettradeordergoodsApi,
    getshippedordergoodsApi,
    getfinishordergoodsApi,
    cancelordergoodsApi,
    confirmordergoodsApi,
    delfinishedgoodsApi,
} from '@/http/index'


const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.push({
        path: "/userCenter"
    })
}

async function cancelOrdertip(goods_id: number) {
    showConfirmDialog({
        title: '提示',
        message: '确认取消订单?',
    }).then(() => {
        cancelOrder(goods_id)
    }).catch(() => {
        showFailToast('取消操作！')
    });
}
// 取消订单
async function cancelOrder(goods_id: number) {
    let res = await cancelordergoodsApi({ goods_id: goods_id })
    if (res.ok) showSuccessToast('取消成功！')
    let index = goodsItemStore.tradeordergoods.findIndex(v => v.goods_id === goods_id)
    goodsItemStore.tradeordergoods.splice(index, 1)
}

async function confirmOrdertip(goods_id: number) {
    showConfirmDialog({
        title: '提示',
        message: '确认收到货?',
    }).then(() => {
        confirmOrder(goods_id)
    }).catch(() => {
        showFailToast('取消操作！')
    });
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
    if (!res.ok) return showFailToast(res.message)
    goodsItemStore.tradeordergoods = res.data
    // 获取待发货商品订单列表
    let resshipped = await getshippedordergoodsApi()
    if (!resshipped.ok) return showFailToast(res.message)
    goodsItemStore.shippedordergoods = resshipped.data
    // 获取已完成商品订单
    let finishres = await getfinishordergoodsApi()
    if (!finishres.ok) return showFailToast(res.message)
    goodsItemStore.finishedOrderGoodsList = finishres.data
})


// 跳转获取卖家联系方式
const topubcontact = (goods_id: number) => {
    router.push({
        name: 'pubContact',
        params: { id: goods_id }
    })
}

// tab
const activeName = ref('a');

// 删除已完成的订单商品
async function finishedOrder(order_id: number) {
    let res = await delfinishedgoodsApi({ order_id: order_id })
    if (!res.ok) return showFailToast('系统繁忙！')

    // 删除本地数据
    let index = goodsItemStore.finishedOrderGoodsList.findIndex(v => v.order_id === order_id)
    if (index === -1) return showFailToast('系统繁忙！')
    goodsItemStore.finishedOrderGoodsList.splice(index, 1)
    showSuccessToast('删除成功！')
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="订单列表" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <van-tabs v-model:active="activeName" style="margin-top: 6vh;">
            <van-tab title="待发货" name="tradeordergoods">
                <div v-if="goodsItemStore.tradeordergoods.length !== 0" class="container_order">
                    <div v-for="item in goodsItemStore.tradeordergoods" :key="item.goods_id" class="container_order_card">
                        <div @click="topubcontact(item.goods_id)">
                            <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                                :thumb=item.goods_title_img>
                                <template #footer>
                                    <van-button size="mini" @click.stop="cancelOrdertip(item.goods_id)">
                                        取消订单
                                    </van-button>
                                </template>
                            </van-card>
                        </div>
                    </div>
                </div>
                <div v-else class="empty"><van-empty description="暂无订单" /></div>
            </van-tab>
            <van-tab title="已发货" name="shippedordergoods">
                <div v-if="goodsItemStore.shippedordergoods.length !== 0" class="container_order">
                    <div v-for="item in goodsItemStore.shippedordergoods" :key="item.goods_id" class="container_order_card">
                        <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                            :thumb=item.goods_title_img>
                            <template #footer>
                                <van-button size="mini" @click="confirmOrdertip(item.goods_id)">
                                    确认收货
                                </van-button>
                            </template>
                        </van-card>
                    </div>
                </div>
                <div v-else class="empty"><van-empty description="暂无订单" /></div>
            </van-tab>
            <van-tab title="历史订单" name="finishedOrderGoodsList">
                <div v-if="goodsItemStore.finishedOrderGoodsList.length !== 0" class="container_finishedOrder">
                    <div v-for="item in goodsItemStore.finishedOrderGoodsList" :key="item.goods_id"
                        class="container_finishedOrder_card">
                        <van-swipe-cell class="container_card">
                            <van-card tag="已完成" :price=item.goods_present_price :desc=item.goods_desc
                                :title=item.goods_title :thumb=item.goods_title_img />
                            <template #right>
                                <van-button square text="删除" type="danger" @click.stop="finishedOrder(item.order_id)"
                                    class="delete-button" />
                            </template>
                        </van-swipe-cell>
                    </div>
                </div>
                <div v-else class="empty"><van-empty description="暂无订单" /></div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<style lang='scss' scoped>
.container {
    :deep(.container_order) {
        margin-top: 0px;
    }

    .empty {
        margin-top: 15vh;
    }

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