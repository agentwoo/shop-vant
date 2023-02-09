<!-- 收藏 -->
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

// 商品详情
const toGoodsDesc = (goodsId: string) => {
    router.push({
        name: 'goodsDesc',
        params: { id: goodsId }
    })
}

// 取消收藏
const cancelCollect = (item: IgoodsDesc) => {
    let index = goodsItemStore.collectGoodsList.findIndex(v => v.goods_id === item.goods_id)
    let index2 = goodsItemStore.goodsItem.findIndex(v => v.goods_id === item.goods_id)
    if (index === -1 || index2 === -1) return showFailToast('出现错误')
    goodsItemStore.collectGoodsList.splice(index, 1)
    goodsItemStore.goodsItem.splice(index2, 1, { ...item, is_collect: '0' })
    showSuccessToast('取消收藏')
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="收藏" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.collectGoodsList.length !== 0" class="container_content">
            <div v-for="item in goodsItemStore.collectGoodsList" :key="item.goods_id"
                @click="toGoodsDesc(item.goods_id)">
                <van-swipe-cell class="container_card">
                    <van-card :price=item.present_price :desc=item.goods_desc :title=item.goods_title class="goods-card"
                        :thumb=item.imgUrl />
                    <template #right>
                        <van-button square text="删除" type="danger" @click.stop="cancelCollect(item)"
                            class="delete-button" />
                    </template>
                </van-swipe-cell>
            </div>
        </div>
        <div v-else class="container_empty">
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