<!-- 搜索页 -->
<script lang='ts' setup>
import { useRouter } from 'vue-router';
import GoodsItem from '@/components/goodsItem/index.vue'
import { useGoodsItemStore } from '@/store/index'

// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}
const goodsItemStore = useGoodsItemStore()


</script>

<template>
    <div class="container">
        <van-nav-bar title="搜索页" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.searchRes.length === 0" class="container_empty">
            <van-empty description="暂无该商品" />
        </div>
        <div v-else>
            <div class="container_content">
                <GoodsItem :goodsItemDesc="goodsItemStore.searchRes"></GoodsItem>
            </div>
            <van-divider>没有更多了</van-divider>
        </div>
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
        margin-top: 50px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 2.5vw;
    }

}
</style>