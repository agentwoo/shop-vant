<!-- 13 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useMenusStore, useGoodsItemStore } from '@/store/index'
import GoodsItem from '@/components/goodsItem/index.vue'

const menusStore = useMenusStore()
const goodsItemStore = useGoodsItemStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}


const tabValue = ref('0')
const kind = ref()
const handleMenulist = (index: number) => {
    console.log(index);
    kind.value = String(index + 1)
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="商品分类" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="menu_detail">
            <!-- 左侧菜单 -->
            <div class="menu_list">
                <van-sidebar v-model="tabValue">
                    <van-sidebar-item :title=item.title v-for="(item, index) in menusStore.menus" :key="index"
                        @click="handleMenulist(index)" />
                </van-sidebar>
            </div>
            <!-- 右侧菜单 -->
            <div class="container_views">
                <goods-item :goodsItemDesc="goodsItemStore.goodsKind(kind)"></goods-item>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {

    &_view {
        width: calc(100% - 80px);
        margin-left: 80px;
    }
}
</style>