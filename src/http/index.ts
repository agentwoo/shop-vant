import exp from 'constants'
import http from './http'

interface Idata {
    username: string,
    password: string,
}

export const loginApi = (data: Idata): any => http({ url: '/api/login', method: 'post', data })
export const registerApi = (data: Idata): any => http({ url: '/api/register', method: 'post', data })


// 发布商品
export const pubgoodsAPi = (data: any): any => http({ url: '/api/pubgoods', method: 'post', data })
// 获取轮播图
export const getswiperApi = () => http({ url: '/api/getswiper', method: 'get' })
// 获取全部商品
export const getallgoodsListApi = () => http({ url: '/api/getallgoodsList', method: 'get' })
// 获取最新商品
export const getnewgoodsListApi = () => http({ url: '/api/getnewgoodsList', method: 'get' })
// 获取热门商品
export const gethotgoodsListApi = () => http({ url: '/api/gethotgoodsList', method: 'get' })
// 获取免费商品
export const getfreegoodsListApi = () => http({ url: '/api/getfreegoodsList', method: 'get' })
// 获取单个商品
export const getgoodsdescApi = (data: { goods_id: string }): any => http({ url: '/api/getgoodsdesc', method: 'post', data })

// 详情页
// 商品点击量加一
export const updateviewsApi = (data: { goods_id: string }) => http({ url: '/api/updateviews', method: 'post', data })
// 商品购买
export const buygoodsitemApi = (data: { goods_id: number }): any => http({ url: '/api/buygoodsitem', method: 'post', data })


// 获取待发货的商品订单列表
export const gettradeordergoodsApi = (): any => http({ url: '/api/gettradeordergoods', method: 'post' })
// 获取已发货的商品订单列表
export const getshippedordergoodsApi = (): any => http({ url: '/api/getshippedgoods', method: 'post' })



// 获取已完成商品订单
export const getfinishordergoodsApi = (): any => http({ url: '/api/getfinishordergoods', method: 'post' })
// 取消订单
export const cancelordergoodsApi = (data: { goods_id: number }): any => http({ url: '/api/cancelordergoods', method: 'post', data })
// 确认收货
export const confirmordergoodsApi = (data: { goods_id: number }): any => http({ url: '/api/confirmordergoods', method: 'post', data })
// 确认发货
export const confirmsendgoodsApi = (data: { goods_id: number }): any => http({ url: '/api/confirmsendgoods', method: 'post', data })


//交易中心
// 获取待发货的商品列表
export const gettradegoodsApi = (): any => http({ url: '/api/tradegoods', method: 'post' })
// 获取待买家确认收货的商品列表
export const getshippedgoodsApi = (): any => http({ url: '/api/shippedgoods', method: 'post' })
//获取交易完成的商品列表
export const gettradefinishedgoodsApi = (): any => http({ url: '/api/tradefinishedgoods', method: 'post' })


// 获取商品分类菜单
export const getgoodskindApi = () => http({ url: '/api/getgoodskind', method: 'get' })



// 我的发布
// 获取我发布的商品
export const getpubgoodsApi = () => http({ url: '/api/getpubgoods', method: 'post' })
// 删除我的发布
export const delgoodsitemApi = (data: { goods_id: string }): any => http({ url: '/api/delgoodsitem', method: 'post', data })
