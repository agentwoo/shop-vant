<!-- 商品分类 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router';
import { useMenusStore, useGoodsItemStore } from '@/store/index'
import ShopItem from '@/components/shopItem/index.vue'

const goodsItemStore = useGoodsItemStore()
const menusStore = useMenusStore()
const data = reactive({
    item: {
        title: '',
        kind: ''
    }
})

const route = useRoute()
watch(() => route.params, newVal => {
    const item = menusStore.menus.find((v) => v.kind === newVal.kind)
    if (item) {
        data.item = item
    }
}, {
    immediate: true
})

</script>

<template>
    <div class="container">
        {{ data.item.title }}
        <ShopItem :goodsItemDesc="goodsItemStore.goodsKind(data.item.kind)"></ShopItem>
    </div>
</template>

<style lang='scss' scoped>
.container {
    margin-top: 60px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 2.5vw;

    :deep(.container) {
        width: 34vw;
    }

    :deep(.container_img img) {
        width: 34vw;
    }
}
</style>