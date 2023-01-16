import exp from 'constants'
import http from './http'

interface Idata {
    username: string,
    password: string,
}

export const loginApi = (data: Idata): any => http({ url: '/api/login', method: 'post', data })
export const registerApi = (data: Idata): any => http({ url: '/api/register', method: 'post', data })

// 上传图片
export const postImgApi = (data: any): any => http({ url: '/api/uploadfile', method: 'post', data })
// 发布商品
export const pubgoodsAPi = (data: any): any => http({ url: '/api/pubgoods', method: 'post', data })
// 我发布的商品
export const getpubgoodsApi = () => http({ url: '/api/getpubgoods', method: 'post' })
// 删除我的发布
export const delgoodsitemApi = (data: { goods_id: string }): any => http({ url: '/api/delgoodsitem', method: 'post', data })
