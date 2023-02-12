<!-- 发布 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useGoodsItemStore } from '@/store/index'
import { getpubgoodsApi, delgoodsitemApi } from '@/http/index'
import { showFailToast, showSuccessToast } from 'vant';

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
    // 当商品状态goods_status等于1时，才允许删除
    let item1 = goodsItemStore.pubGoodsList.find(v => v.goods_id === goods_id)
    if (item1?.goods_status !== '1') return showFailToast('该商品已被下单，不允许删除！')
    // 删除商品
    let id = goods_id.toString()
    let res = await delgoodsitemApi({ goods_id: id })
    if (!res.ok) return

    showSuccessToast('删除成功！')
    let index = goodsItemStore.pubGoodsList.findIndex(v => v.goods_id === goods_id)
    let item = goodsItemStore.pubGoodsList.find(v => v.goods_id === goods_id)
    if (index === -1 || !item) return
    goodsItemStore.pubGoodsList.splice(index, 1, { ...item, is_delgoods: '1' })
}

// 跳转详情页
const toupdategoodsdesc = (goods_id: string) => {
    router.push({
        name: 'updategoodsdesc',
        params: { id: goods_id }
    })
}


</script>

<template>
    <div class="container">
        <van-nav-bar title="发布" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <div v-if="goodsItemStore.undelgoodsList$.length === 0" class="container_empty">
            <van-empty description="暂无发布商品" />
        </div>
        <div v-else style="margin-top:50px">
            <van-swipe-cell v-for="item in goodsItemStore.undelgoodsList$" :key="item.goods_id" class="container_card">
                <div @click="toupdategoodsdesc(item.goods_id)">
                    <van-card :price=item.goods_origin_price :desc=item.goods_desc :title=item.goods_title
                        class="goods-card" :thumb=item.goods_title_img>
                        <template #footer>
                            <van-button size="mini" @click.stop="delpubgood(item.goods_id)"
                                v-if="item.goods_status === '1'">
                                取消发布
                            </van-button>
                        </template>
                    </van-card>
                </div>
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