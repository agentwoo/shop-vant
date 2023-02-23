<!-- 13 -->
<script lang='ts' setup>
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useMenusStore, useGoodsItemStore } from '@/store/index'
import GoodsItem from '@/components/goodsItem/index.vue'
import { getgoodskindApi, getallgoodsListApi } from '@/http/index'
import { showFailToast } from 'vant';

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

// 修改
onMounted(async () => {
    // 获取分类菜单
    let res = await getgoodskindApi()
    if (!res.ok) showFailToast('系统繁忙')
    menusStore.menus = res.data
    // 获取所有商品数据
    let resgoods = await getallgoodsListApi()
    goodsItemStore.allGoodsList = resgoods.data
})

</script>

<template>
    <div class="container">
        <van-nav-bar title="商品分类" left-text="返回" fixed left-arrow @click-left="onClickLeft" />
        <div class="container_menus">
            <!-- 左侧菜单 -->
            <div class="container_menus_list">
                <van-sidebar v-model="tabValue">
                    <van-sidebar-item :title=item.text v-for="(item, value) in menusStore.menus" :key="item.kind_id"
                        @click="handleMenulist(value)" />
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
            overflow: hidden;
            overflow-y: scroll;


            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 0 2vw;

            :deep(.container) {
                width: 33vw;
            }

            :deep(.van-image__img) {
                width: 78%;
                border-radius: 20px;
                // object-fit: contain;
            }

        }
    }
}
</style>