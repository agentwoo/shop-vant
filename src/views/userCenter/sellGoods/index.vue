<!-- 卖出 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useGoodsItemStore } from '@/store/index'
import { delgoodsitemApi, getpubgoodsApi } from '@/http/index'
import { showSuccessToast } from 'vant';


const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

// 获取已发布的商品列表
onMounted(async () => {
    let res = await getpubgoodsApi()
    goodsItemStore.pubGoodsList = res.data
})

// 删除发布的商品
async function delpubgood(goods_id: string) {
    let id = goods_id.toString()
    let res = await delgoodsitemApi({ goods_id: id })
    if (!res.ok) return

    showSuccessToast('删除成功！')
    let index = goodsItemStore.pubGoodsList.findIndex(v => v.goods_id === goods_id)
    let item = goodsItemStore.pubGoodsList.find(v => v.goods_id === goods_id)
    if (index === -1 || !item) return
    goodsItemStore.pubGoodsList.splice(index, 1, { ...item, is_delgoods: '1' })
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="卖出" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div v-if="goodsItemStore.undelgoodsList$.length === 0" class="container_empty">
            <van-empty description="暂无卖出商品" />
        </div>
        <div v-else>
            <van-swipe-cell v-for="item in goodsItemStore.sellgoodsList$" :key="item.goods_id" class="container_card">
                <van-card :price=item.goods_present_price :desc=item.goods_desc :title=item.goods_title
                    class="goods-card" :thumb=item.goods_title_img />
                <template #right>
                    <van-button square text="删除" type="danger" class="delete-button"
                        @click="delpubgood(item.goods_id)" />
                </template>
            </van-swipe-cell>
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