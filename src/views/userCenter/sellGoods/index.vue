<!-- 卖出 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { showFailToast, showSuccessToast, showConfirmDialog } from 'vant';
import { useGoodsItemStore } from '@/store/index'
import {
    gettradegoodsApi,
    getshippedgoodsApi,
    gettradefinishedgoodsApi,
    confirmsendgoodsApi,
    deltradefinishedgoodsAPi
} from '@/http/index'


const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.push({
        path: "/userCenter"
    })
}

// 获取商品列表
onMounted(async () => {
    // 待发货
    let restradegoods = await gettradegoodsApi()
    if (!restradegoods.ok) return showFailToast(restradegoods.message)
    goodsItemStore.tradeGoodsList = restradegoods.data

    // 待买家确认收货
    let resshippedgoods = await getshippedgoodsApi()
    if (!resshippedgoods.ok) return showFailToast(resshippedgoods.message)
    goodsItemStore.shippedGoodsList = resshippedgoods.data

    // 已完成交易
    let restradefinishedgoods = await gettradefinishedgoodsApi()
    if (!restradefinishedgoods.ok) return showFailToast(restradefinishedgoods.message)
    goodsItemStore.tradefinishedGoodsList = restradefinishedgoods.data
})

async function sendoutgoodstip(goods_id: number) {
    showConfirmDialog({
        title: '提示',
        message: '确认发货?',
    }).then(() => {
        sendoutgoods(goods_id)
    }).catch(() => {
        showFailToast('取消操作！')
    });
}


// 确认发货
async function sendoutgoods(goods_id: number) {
    // 获取后台数据
    let res = await confirmsendgoodsApi({ goods_id: goods_id })
    if (!res.ok) return showFailToast('系统繁忙！')
    // 在本地列表中操作
    let index = goodsItemStore.tradeGoodsList.findIndex(v => v.goods_id === goods_id)
    let item = goodsItemStore.tradeGoodsList.find(v => v.goods_id === goods_id)
    goodsItemStore.tradeGoodsList.splice(index, 1)
    if (!item) return showFailToast('系统繁忙！')
    goodsItemStore.shippedGoodsList.push(item)
    showSuccessToast('发货成功！')
}


// 删除已完成的交易数据
async function deltradefinishedgoods(goods_id: number) {
    let res = deltradefinishedgoodsAPi({ goods_id: goods_id })
    if (!res.ok) showFailToast(res.message)

    // 删除store中的数据
    let index = goodsItemStore.tradefinishedGoodsList.findIndex(v => v.goods_id === goods_id)
    goodsItemStore.tradefinishedGoodsList.splice(index, 1)
    showSuccessToast('删除成功！')
}


const activeName = ref('a');

</script>

<template>
    <div class="container">
        <van-nav-bar title="交易中心" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-tabs v-model:active="activeName">
            <van-tab title="待发货" name="tradeGoodsList">
                <div v-if="goodsItemStore.tradeGoodsList.length !== 0">
                    <van-swipe-cell v-for="item in goodsItemStore.tradeGoodsList" :key="item.goods_id"
                        class="container_card">
                        <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                            class="goods-card" :thumb=item.goods_title_img>
                            <template #footer>
                                <van-button size="mini" @click="sendoutgoodstip(item.goods_id)"
                                    v-if="item.goods_status === '2'">
                                    确认发货
                                </van-button>
                            </template>
                        </van-card>
                    </van-swipe-cell>
                </div>
                <div v-else class="empty"><van-empty description="暂无交易物品" /></div>
            </van-tab>
            <van-tab title="等待买家确认收货" name="shippedGoodsList">
                <div v-if="goodsItemStore.shippedGoodsList.length !== 0">
                    <van-swipe-cell v-for="item in goodsItemStore.shippedGoodsList" :key="item.goods_id"
                        class="container_card">
                        <van-card tag="待收货" :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                            class="goods-card" :thumb=item.goods_title_img>
                            <template #footer>
                                <van-button size="mini" v-if="item.goods_status === '3'">
                                    等待买家确认收货
                                </van-button>
                            </template>
                        </van-card>
                    </van-swipe-cell>
                </div>
                <div v-else class="empty"><van-empty description="暂无交易物品" /></div>
            </van-tab>
            <van-tab title="交易完成" name="tradefinishedGoodsList">
                <div v-if="goodsItemStore.tradefinishedGoodsList.length !== 0">
                    <van-swipe-cell v-for="item in goodsItemStore.tradefinishedGoodsList" :key="item.goods_id"
                        class="container_card">
                        <van-card tag="已完成" :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                            class="goods-card" :thumb=item.goods_title_img>
                        </van-card>
                        <template #right>
                            <van-button square text="删除" type="danger" @click.stop="deltradefinishedgoods(item.goods_id)"
                                class="delete-button" />
                        </template>
                    </van-swipe-cell>
                </div>
                <div v-else class="empty"><van-empty description="暂无交易物品" /></div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<style lang='scss' scoped>
.container {
    .empty {
        margin-top: 15vh;
    }

    &_card {
        margin-top: 10px;
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