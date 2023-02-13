<!-- 搜索页 -->
<script lang='ts' setup>
import { onMounted, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import GoodsItem from '@/components/goodsItem/index.vue'
import { getsearchgoodsListApi } from '@/http/index'
import { Igoods } from '@/utils/store';
import { showFailToast } from 'vant';

// navbar
const router = useRouter()
const route = useRoute()
const onClickLeft = () => {
    router.back()
}
const data = reactive({
    searchVal: '',
    resVal: [] as Igoods[]
})

watch(() => route.query.searchVal, (newVal) => {
    data.searchVal = newVal as string
}, {
    immediate: true,
})

onMounted(async () => {
    let res = await getsearchgoodsListApi({ searchVal: data.searchVal })
    if (!res.ok) return showFailToast('系统繁忙！')
    data.resVal = res.data
})

</script>

<template>
    <div class="container">
        <van-nav-bar title="搜索页" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div v-if="data.resVal.length === 0" class="container_empty">
            <van-empty description="暂无该商品" />
        </div>
        <div v-else>
            <div class="container_content">
                <GoodsItem :goodsItemDesc="data.resVal"></GoodsItem>
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