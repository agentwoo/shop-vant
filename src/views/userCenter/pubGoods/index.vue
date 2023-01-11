<!-- 发布 -->
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
        <van-nav-bar title="发布" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-swipe-cell v-for="item in goodsItemStore.goodsItem" :key="item.goods_id" class="container_card">
            <van-card :price=item.present_price :desc=item.goods_desc :title=item.goods_title class="goods-card"
                :thumb=item.imgUrl />
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" />
            </template>
        </van-swipe-cell>
    </div>
</template>

<style lang='scss' scoped>
.container {
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