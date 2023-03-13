<!-- 发布 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useGoodsItemStore } from '@/store/index'
import { getpubgoodsApi, delgoodsitemApi, getremovegoodsApi, removegoodsApi, readdpubgoodsApi } from '@/http/index'
import { showFailToast, showSuccessToast, showConfirmDialog } from 'vant';

const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.push({
        path: '/userCenter'
    })
}

// 获取已发布的商品列表
onMounted(async () => {
    let res = await getpubgoodsApi()
    if (!res.ok) return showFailToast(res.message)
    goodsItemStore.pubGoodsList = res.data

    let resremove = await getremovegoodsApi()
    if (!res.ok) return showFailToast(res.message)
    goodsItemStore.removeGoodsList = resremove.data
})



// 提示框
async function deltip(goods_id: string) {
    showConfirmDialog({
        title: '提示',
        message: '确认下架商品?',
    }).then(() => {
        delpubgood(goods_id)
    }).catch(() => {
        showFailToast('取消！')
    });
}

// 下架发布的商品
async function delpubgood(goods_id: string) {
    // 当商品状态goods_status等于1时，才允许删除
    let item1 = goodsItemStore.pubGoodsList.find(v => v.goods_id === goods_id)
    if (item1?.goods_status !== '1') return showFailToast('该商品已被下单，不允许删除！')
    // 删除商品
    let id = goods_id.toString()
    let res = await delgoodsitemApi({ goods_id: id })
    if (!res.ok) return

    showSuccessToast('下架成功！')
    let index = goodsItemStore.pubGoodsList.findIndex(v => v.goods_id === goods_id)
    let item = goodsItemStore.pubGoodsList.find(v => v.goods_id === goods_id)
    if (index === -1 || !item) return
    goodsItemStore.pubGoodsList.splice(index, 1)
    goodsItemStore.removeGoodsList.unshift({ ...item, goods_status: '0' })
}

// 跳转详情页
const toupdategoodsdesc = (goods_id: string) => {
    router.push({
        name: 'updategoodsdesc',
        params: { id: goods_id }
    })
}

const activeName = ref('')


// 删除提示框
async function removetip(goods_id: string) {
    showConfirmDialog({
        title: '提示',
        message: '确认下架商品?',
    }).then(() => {
        removepubgoods(goods_id)
    }).catch(() => {
        showFailToast('取消！')
    });
}
// 删除下架的商品
async function removepubgoods(goods_id: string) {
    let res = await removegoodsApi({ goods_id: goods_id })
    if (!res.ok) return showFailToast(res.message)

    let index = goodsItemStore.removeGoodsList.findIndex(v => v.goods_id === goods_id)
    if (index === -1) return
    goodsItemStore.removeGoodsList.splice(index, 1)
    showSuccessToast(res.message)
}

// 重新上架提示框
async function readdtip(goods_id: string) {
    showConfirmDialog({
        title: '提示',
        message: '确认下架商品?',
    }).then(() => {
        readdpubgoods(goods_id)
    }).catch(() => {
        showFailToast('取消！')
    });
}
// 重新上架的商品
async function readdpubgoods(goods_id: string) {
    let res = await readdpubgoodsApi({ goods_id: goods_id })
    if (!res.ok) return showFailToast(res.message)


    let index = goodsItemStore.removeGoodsList.findIndex(v => v.goods_id === goods_id)
    let item = goodsItemStore.removeGoodsList.find(v => v.goods_id === goods_id)
    if (index === -1) return
    goodsItemStore.removeGoodsList.splice(index, 1)
    if (!item) return
    goodsItemStore.pubGoodsList.unshift(item)
    showSuccessToast(res.message)
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="我的发布" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <van-tabs v-model:active="activeName" style="margin-top: 6vh;">
            <van-tab title="展示中" name="pub">
                <!-- 获取发布中的商品 -->
                <div v-if="goodsItemStore.pubGoodsList.length !== 0">
                    <van-swipe-cell v-for="item in goodsItemStore.pubGoodsList" :key="item.goods_id" class="container_card">
                        <div @click="toupdategoodsdesc(item.goods_id)">
                            <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                                class="goods-card" :thumb=item.goods_title_img>
                                <template #footer>
                                    <van-button size="mini" @click.stop="deltip(item.goods_id)">
                                        下架商品
                                    </van-button>
                                </template>
                            </van-card>
                        </div>
                    </van-swipe-cell>
                </div>
                <div v-else>
                    <van-empty description=" 暂无发布商品" />
                </div>
            </van-tab>
            <van-tab title="未展示" name="remove">
                <!-- 获取已下架的商品 -->
                <div v-if="goodsItemStore.removeGoodsList.length !== 0">
                    <van-swipe-cell v-for="item in goodsItemStore.removeGoodsList" :key="item.goods_id"
                        class="container_card">
                        <div @click="toupdategoodsdesc(item.goods_id)">
                            <van-card :tag="item.goods_status == '0' ? '已下架' : '审核未通过'" :price=item.goods_origin_price
                                :desc=item.goods_desc :title=item.goods_title class="goods-card"
                                :thumb=item.goods_title_img>
                                <template #footer>
                                    <van-button size="mini" @click.stop="removetip(item.goods_id)">
                                        删除商品
                                    </van-button>
                                    <van-button size="mini" @click.stop="readdtip(item.goods_id)">
                                        重新上架
                                    </van-button>
                                </template>
                            </van-card>
                        </div>
                    </van-swipe-cell>
                </div>
                <div v-else>
                    <van-empty description="暂无发布商品" />
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<style lang='scss' scoped>
.container_card {
    margin-top: 10px;
}


:deep(.van-empty) {
    margin-top: 10vh;
}


.goods-card {
    margin: 0;
    background-color: white;
}

.delete-button {
    height: 100%;
}
</style>