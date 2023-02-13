import { computed, reactive, toRefs } from "vue";
import { defineStore } from 'pinia';
import { IgoodsDesc, pubgood } from '@/utils/store'
import { Igoods, Imenus, Iorder, Icollect } from '@/utils/store'

const arr = {
    replace: function <T>(list: T[], item: T, key: keyof T) {
        let index = list.findIndex(v => v[key] === item[key])
        if (index === -1) {
            list.push(item)
        } else {
            list.splice(index, 1, item)
        }
    }
}

export const useGoodsItemStore = defineStore('goods', () => {
    const state = reactive({
        allGoodsList: [] as Igoods[],//全部商品
        newGoodsList: [] as Igoods[],//最新商品
        hotGoodsList: [] as Igoods[],//热门商品
        freeGoodsList: [] as Igoods[],//免费商品

        tradeordergoods: [] as Iorder[], //待发货订单列表
        shippedordergoods: [] as Iorder[], //待收货订单列表
        finishedOrderGoodsList: [] as Iorder[], //已完成订单列表

        tradeGoodsList: [] as Iorder[], //交易中的待发货列表
        shippedGoodsList: [] as Iorder[], //交易中的已发货列表
        tradefinishedGoodsList: [] as Iorder[], //交易完成列表

        collectGoodsList: [] as Icollect[], //收藏列表
        expirecollectgoods: [] as Icollect[], //失效的收藏列表

        pubGoodsList: [] as pubgood[],//发布商品列表
    })

    // 查找事项
    function searchItem(Val: string): 0 | 1 | Igoods[] {
        let val = Val.trim()
        if (!val) return 0
        let arr = state.allGoodsList.filter((v) => v.goods_title.indexOf(val) !== -1)
        if (arr.length === 0) return 1
        return arr
    }

    //商品详情分类
    function goodsKind(kind: string) {
        return state.allGoodsList.filter(v => v.goods_pid === kind)
    }


    // 前后端交互
    // 未删除和为完成的商品发布列表
    const undelgoodsList$ = computed(() => {
        return state.pubGoodsList.filter(v => v.is_delgoods === '0' && v.goods_status !== '4')
    })
    const sellgoodsList$ = computed(() => {
        return state.pubGoodsList.filter(v => v.is_delgoods === '0' && v.goods_status === '4')
    })


    return {
        ...toRefs(state),
        searchItem,
        goodsKind,


        undelgoodsList$,
        sellgoodsList$
    }
})



// 商品类别
export const useMenusStore = defineStore('menus', () => {
    const state = reactive({
        menus: [] as Imenus[],
    })

    return {
        ...toRefs(state)
    }
})


// 用户详情
export const useUserStore = defineStore('user', () => {
    const state = reactive({
        user: JSON.parse(localStorage.getItem('userInfo') as string) || {},
        token: JSON.parse(localStorage.getItem('token') as string) || {},
        logintimestamp: JSON.parse(localStorage.getItem('logintimestamp') as string) || ''
    })
    return {
        ...toRefs(state)
    }
})