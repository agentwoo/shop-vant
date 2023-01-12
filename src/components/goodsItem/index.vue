<!-- 商品页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from 'vue'
import router from '@/router';
import { useGoodsItemStore } from '@/store/index'
import { IgoodsDesc } from '@/utils/store'

type Props = {
    goodsItemDesc?: IgoodsDesc[]
}
defineProps<Props>()

const goodsItemStore = useGoodsItemStore()
const toGoodsDesc = (goodsId: string) => {
    router.push({
        name: 'goodsDesc',
        params: { id: goodsId }
    })

    // 点击时views数量加一，还需调用后台接口
    let index = goodsItemStore.goodsItem.findIndex(v => v.goods_id === goodsId)
    let item = goodsItemStore.goodsItem.find(v => v.goods_id === goodsId)
    if (!item) return
    let views = Number(item.views) + 1
    goodsItemStore.goodsItem.splice(index, 1, { ...item, views: String(views) })
}
</script>

<template>
    <div class="container" v-for="item in goodsItemDesc" :key="item.goods_id" @click="toGoodsDesc(item.goods_id)">
        <div class="container_img">
            <van-image width="11rem" height="11rem" fit="cover" radius="20px" :src="item.imgUrl" />
        </div>
        <div class="container_text">
            <div class="van-ellipsis">{{ item.goods_title }}</div>
            <div class="container_text_info">
                <div class="container_text_info_price">￥{{ item.present_price }}</div>
                <div class="container_text_info_views">
                    <span>{{ item.views }}热度</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    width: 42vw;
    height: 30vh;
    padding: 2vw;
    overflow: hidden;
    margin-bottom: 1vh;
    background-color: white;
    border-radius: 6%;

    &_text {

        &_info {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;

            &_price {
                color: red;
            }

            &_views {
                font-size: 12px;
            }
        }
    }

}
</style>