<!-- 商品页 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, watch, onMounted } from 'vue'
import router from '@/router';
import { useGoodsItemStore } from '@/store/index'
import { Igoods } from '@/utils/store'
import { updateviewsApi } from '@/http/index'

type Props = {
    goodsItemDesc?: Igoods[]
}
defineProps<Props>()

const goodsItemStore = useGoodsItemStore()

// 跳转详情页
async function toGoodsDesc(goodsId: number) {
    router.push({
        name: 'goodsDesc',
        params: { id: goodsId }
    })
    // 点击时views数量加一
    let res = await updateviewsApi({ goods_id: String(goodsId) })
}


</script>

<template>
    <div class="container" v-for="item in goodsItemDesc" :key="item.goods_id" @click="toGoodsDesc(item.goods_id)">
        <div class="container_img">
            <van-image width="11rem" height="11rem" fit="cover" radius="20px" :src="item.goods_title_img" />
        </div>
        <div class="container_text">
            <div class="van-ellipsis">{{ item.goods_title }}</div>
            <div class="container_text_info">
                <div class="container_text_info_price">￥{{ item.goods_present_price }}</div>
                <div class="container_text_info_views">
                    <span>{{ item.goods_views }}热度</span>
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