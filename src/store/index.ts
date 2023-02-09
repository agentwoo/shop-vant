import { computed, onMounted, reactive, toRefs } from "vue";
import { defineStore } from 'pinia';

import imgUrl from '@/assets/pig.jpeg';
import { IgoodsDesc, pubgood } from '@/utils/store'
import { Igoods, Imenus, Iorder } from '@/utils/store'

const goodsItem = [
    {
        goods_id: '1', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '1111111111111111111111111111111111111',
        goods_desc: '13131213121312111111111111111111111', present_price: '1', origin_price: '666', views: '0', kind: '1',
        pub_time: '2022-1-1', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '2', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '2222222222222222222222',
        goods_desc: '13131213121312', present_price: '2', origin_price: '777', views: '0', kind: '2',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '3', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '3333333333333333333333',
        goods_desc: '13131213121312', present_price: '3', origin_price: '888', views: '0', kind: '3',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '4', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '4444444444444444444444',
        goods_desc: '13131213121312', present_price: '4', origin_price: '999', views: '0', kind: '4',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '5', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '555555555555555555555',
        goods_desc: '13131213121312', present_price: '5', origin_price: '1010', views: '0', kind: '5',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '6', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '4444444444444444444444',
        goods_desc: '13131213121312', present_price: '0', origin_price: '999', views: '0', kind: '6',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '7', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '555555555555555555555',
        goods_desc: '13131213121312', present_price: '0', origin_price: '1010', views: '0', kind: '7',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '8', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '555555555555555555555',
        goods_desc: '13131213121312', present_price: '5', origin_price: '1010', views: '0', kind: '1',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '9', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '4444444444444444444444',
        goods_desc: '13131213121312', present_price: '0', origin_price: '999', views: '0', kind: '1',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '10', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '555555555555555555555',
        goods_desc: '13131213121312', present_price: '0', origin_price: '1010', views: '0', kind: '1',
        pub_time: '2023-1-1', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '11', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '555555555555555555555',
        goods_desc: '13131213121312', present_price: '5', origin_price: '1010', views: '0', kind: '1',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '12', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '4444444444444444444444',
        goods_desc: '13131213121312', present_price: '0', origin_price: '999', views: '0', kind: '1',
        pub_time: '', is_collect: '0', order_states: '1'
    },
    {
        goods_id: '13', imgUrl: imgUrl, swiper_img: [{ img: imgUrl }], goods_title: '555555555555555555555',
        goods_desc: '13131213121312', present_price: '0', origin_price: '1010', views: '0', kind: '1',
        pub_time: '', is_collect: '0', order_states: '1'
    },

]


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
        goodsItem: goodsItem,//全部商品

        searchVal: '',//搜索
        searchRes: [] as Igoods[],//搜索返回值
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





        collectGoodsList: [] as IgoodsDesc[],//收藏列表
        expCollectGoodsList: [] as IgoodsDesc[],//失效的收藏链接


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
        return state.goodsItem.filter((v) => v.kind === kind && v.order_states === '1')
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
const kindMenus = [
    {
        text: '生活用品', value: '1',
    },
    {
        text: '衣服鞋帽', value: '2',
    },
    {
        text: '运动健身', value: '3',
    },
    {
        text: '电子产品', value: '4',
    },
    {
        text: '零食饮料', value: '5',
    },
    {
        text: '学习用品', value: '6',
    },
    {
        text: '其它', value: '7',
    },
]
export const useMenusStore = defineStore('menus', () => {
    const state = reactive({
        menus: kindMenus,
        menus1: [] as Imenus[],
    })

    return {
        ...toRefs(state)
    }
})


// 用户详情
const user = {
    user_id: '1',
    user_name: 'zhangsan',
    password: '123456',
    user_head_img: 'https://imgsa.baidu.com/forum/pic/item/fb530f3b5bb5c9ea472928e4d839b6003bf3b323.jpg',
    nickname: 'helloWorld',
    token: ''
}
export const useUserStore = defineStore('user', () => {
    const state = reactive({
        user: user || {}
    })

    return {
        ...toRefs(state)
    }
})