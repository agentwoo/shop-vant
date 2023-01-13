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
const kind = ref('1')
const handleMenulist = (index: number) => {
    kind.value = String(index + 1)
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="商品分类" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div class="container_menus">
            <!-- 左侧菜单 -->
            <div class="container_menus_list">
                <van-sidebar v-model="tabValue">
                    <van-sidebar-item :title=item.text v-for="(item, index) in menusStore.menus" :key="index"
                        @click="handleMenulist(index)" />
                </van-sidebar>
            </div>
            <!-- 右侧菜单 -->
            <div class="container_menus_views">
                <goods-item :goodsItemDesc="goodsItemStore.goodsKind(kind)"></goods-item>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    height: 100%;
    overflow: hidden;

    &_menus {
        &_list {
            position: absolute;
            top: 46px;
            left: 0;
            bottom: 0;
            width: 80px;
            background-color: white;

            :deep(.van-sidebar-item) {
                background-color: white;
            }

            :deep(.van-sidebar-item--select, .van-sidebar-item--select:active) {
                background-color: #F7F8FA;
            }
        }

        &_views {
            position: absolute;
            top: 46px;
            left: 80px;
            bottom: 0;
            overflow-y: scroll;

            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 2vw;

            :deep(.container) {
                width: 33vw;
            }

            :deep(.van-image__img) {
                width: 80%;
            }

        }
    }
}
</style>