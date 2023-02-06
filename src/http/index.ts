import exp from 'constants'
import http from './http'

interface Idata {
    username: string,
    password: string,
}

export const loginApi = (data: Idata): any => http({ url: '/api/login', method: 'post', data })
export const registerApi = (data: Idata): any => http({ url: '/api/register', method: 'post', data })


// 获取轮播图
export const getswiperApi = () => http({ url: 'api/getswiper', method: 'get' })
// 获取全部商品
export const getallgoodsListApi = () => http({ url: 'api/getallgoodsList', method: 'get' })
// 获取最新商品
export const getnewgoodsListApi = () => http({ url: 'api/getnewgoodsList', method: 'get' })
// 获取热门商品
export const gethotgoodsListApi = () => http({ url: 'api/gethotgoodsList', method: 'get' })
// 获取免费商品
export const getfreegoodsListApi = () => http({ url: 'api/getfreegoodsList', method: 'get' })
// 获取单个商品
export const getgoodsdescApi = (data: { goods_id: string }): any => http({ url: 'api/getgoodsdesc', method: 'post', data })
// 商品点击量加一
export const updateviewsApi = (data: { goods_id: string }) => http({ url: 'api/updateviews', method: 'post', data })



// 获取商品分类菜单
export const getgoodskindApi = () => http({ url: 'api/getgoodskind', method: 'get' })



// 发布商品
export const pubgoodsAPi = (data: any): any => http({ url: '/api/pubgoods', method: 'post', data })
// 获取我发布的商品
export const getpubgoodsApi = () => http({ url: '/api/getpubgoods', method: 'post' })
// 删除我的发布
export const delgoodsitemApi = (data: { goods_id: string }): any => http({ url: '/api/delgoodsitem', method: 'post', data })
