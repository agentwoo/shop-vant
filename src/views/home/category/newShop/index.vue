<!-- 最新商品 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useGoodsItemStore } from '@/store/index'
import GoodsItem from '@/components/goodsItem/index.vue'


const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="最新商品" fixed left-text="返回" left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.newGoodsList$.length === 0" class="container_empty">
            <van-empty description="暂无商品" />
        </div>
        <div v-else class="container_content">
            <GoodsItem :goodsItemDesc="goodsItemStore.newGoodsList$"></GoodsItem>
        </div>
        <van-divider>没有更多了</van-divider>
    </div>
</template>

<style lang='scss' scoped>
.container {
    &_empty {
        :deep(.van-empty) {
            margin-top: 20vh;
        }
    }

    &_content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 1vh;
        padding: 0 2.5vw;
    }

    :deep(.container_content) {
        margin-top: 7vh;
    }
}
</style>