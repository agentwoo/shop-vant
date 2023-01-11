<!-- 收藏 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useGoodsItemStore } from '@/store/index'

const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="收藏" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.collectGoodsList.length !== 0">
            <van-swipe-cell v-for="item in goodsItemStore.collectGoodsList" :key="item.goods_id" class="container_card">
                <van-card :price=item.present_price :desc=item.goods_desc :title=item.goods_title class="goods-card"
                    :thumb=item.imgUrl />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button" />
                    <van-button square text="取消" type="primary" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div>
        <div v-else class="container_empty">
            <van-empty description="暂无收藏" />
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
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