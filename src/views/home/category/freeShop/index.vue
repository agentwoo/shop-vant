<!-- 免费商品 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useGoodsItemStore } from '@/store/index'
import GoodsItem from '@/components/goodsItem/index.vue'
import { getfreegoodsListApi } from '@/http/index'

const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

onMounted(async () => {
    let resnewgoods = await getfreegoodsListApi()
    // console.log('----------', resnewgoods);

    goodsItemStore.freeGoodsList = resnewgoods.data
})

</script>

<template>
    <div class="container">
        <van-nav-bar title="免费商品" fixed left-text="返回" left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.freeGoodsList.length === 0" class="container_empty">
            <van-empty description="暂无商品" />
        </div>
        <div v-else class="container_content">
            <GoodsItem :goodsItemDesc="goodsItemStore.freeGoodsList"></GoodsItem>
        </div>
        <div v-if="goodsItemStore.freeGoodsList.length !== 0">
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