<!-- 收藏 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';
import { useGoodsItemStore } from '@/store/index'
import { Icollect } from '@/utils/store'
import { getcollectgoodsApi, delcollectgoodsApi, expirecollectgoodsApi } from '@/http/index'

const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.push({
        path: "/userCenter"
    })
}

// 商品详情
const toGoodsDesc = (goodsId: string) => {
    router.push({
        name: 'goodsDesc',
        params: { id: goodsId }
    })
}

// 取消收藏
async function cancelCollect(collect_id: number) {
    let res = await delcollectgoodsApi({ collect_id: collect_id })
    if (!res.ok) showFailToast('系统繁忙！')
    let index = goodsItemStore.collectGoodsList.findIndex(v => v.collect_id === collect_id)
    goodsItemStore.collectGoodsList.splice(index, 1)
    showSuccessToast('成功取消收藏！')
}

// 删除失效的收藏商品
async function delcollectgoods(collect_id: number) {
    let res = await delcollectgoodsApi({ collect_id: collect_id })
    if (!res.ok) showFailToast('系统繁忙！')
    let index = goodsItemStore.expirecollectgoods.findIndex(v => v.collect_id === collect_id)
    goodsItemStore.expirecollectgoods.splice(index, 1)
    showSuccessToast('成功删除失效商品！')
}


onMounted(async () => {
    // 获取收藏商品列表
    let res = await getcollectgoodsApi()
    if (!res.ok) showFailToast('系统繁忙！')
    goodsItemStore.collectGoodsList = res.data

    // 获取失效的商品列表
    let resexpire = await expirecollectgoodsApi()
    if (!resexpire.ok) showFailToast('系统繁忙！')
    goodsItemStore.expirecollectgoods = resexpire.data
})



</script>

<template>
    <div class="container">
        <van-nav-bar title="我的收藏" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.collectGoodsList.length !== 0" class="container_content">
            <div v-for="item in goodsItemStore.collectGoodsList" :key="item.goods_id"
                @click="toGoodsDesc(item.goods_id)">
                <van-swipe-cell class="container_card">
                    <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                        class="goods-card" :thumb=item.goods_title_img />
                    <template #right>
                        <van-button square text="取消收藏" type="danger" @click.stop="cancelCollect(item.collect_id)"
                            class="delete-button" />
                    </template>
                </van-swipe-cell>
            </div>
        </div>
        <div v-if="goodsItemStore.expirecollectgoods.length !== 0" class="container_content">
            <van-divider>失效的商品</van-divider>
            <div v-for="item in goodsItemStore.expirecollectgoods" :key="item.goods_id">
                <van-swipe-cell class="container_card">
                    <van-card tag="已失效" :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                        class="goods-card" :thumb=item.goods_title_img />
                    <template #right>
                        <van-button square text="删除" type="danger" @click.stop="delcollectgoods(item.collect_id)"
                            class="delete-button" />
                    </template>
                </van-swipe-cell>
            </div>
        </div>
        <div v-if="goodsItemStore.collectGoodsList.length === 0 && goodsItemStore.expirecollectgoods.length === 0"
            class="container_empty">
            <van-empty description="暂无收藏" />
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    &_content {
        margin-top: 50px;
    }

    &_card {
        margin-top: 10px;
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