import http from './http'

// 登录注册
interface Idata {
    username: string,
    password: string,
}

interface Iupdategoodsdesc {
    goods_id: number,
    goods_title: string,
    goods_desc: string,
    goods_origin_price: string,
    goods_present_price: string,
    goods_contact: string,
    goods_title_img: string,
    goods_swiper_img1: string,
    goods_swiper_img2: string,
    goods_swiper_img3: string,
    goods_swiper_img4: string,
}

export const loginApi = (data: Idata): any => http({ url: '/api/my/login', method: 'post', data })
export const registerApi = (data: Idata): any => http({ url: '/api/my/register', method: 'post', data })
// 修改密码
export const updatepasswodApi = (data: { user_name: string, password: string }): any =>
    http({ url: '/api/my/updatepasswod', method: 'post', data })
// 修改头像
export const updateuserImgApi = (data: { user_img: string, user_name: string }): any =>
    http({ url: '/api/my/updateuserImg', method: 'post', data })
// 修改用户名
export const updateuserNameApi = (data: { user_name: string, user_id: number }): any =>
    http({ url: '/api/my/updateuserName', method: 'post', data })



// 发布商品
export const pubgoodsAPi = (data: any): any => http({ url: '/api/pubgoods', method: 'post', data })
// 获取轮播图
export const getswiperApi = (): any => http({ url: '/api/my/getswiper', method: 'get' })


// 获取全部商品
export const getallgoodsListApi = () => http({ url: '/api/my/getallgoodsList', method: 'get' })
// 获取全部商品-随机
export const getallgoodsrandListApi = () => http({ url: '/api/my/getallgoodsrandList', method: 'get' })
// 获取最新商品
export const getnewgoodsListApi = () => http({ url: '/api/my/getnewgoodsList', method: 'get' })
// 获取热门商品
export const gethotgoodsListApi = () => http({ url: '/api/my/gethotgoodsList', method: 'get' })
// 获取免费商品
export const getfreegoodsListApi = () => http({ url: '/api/my/getfreegoodsList', method: 'get' })
// 获取单个商品
export const getgoodsdescApi = (data: { goods_id: string }): any => http({ url: '/api/my/getgoodsdesc', method: 'post', data })
// 获取搜索页商品
export const getsearchgoodsListApi = (data: { searchVal: string }): any =>
    http({ url: `/api/my/getsearchgoodsList?searchVal=${data.searchVal}`, method: 'post', data })




// 详情页
// 商品点击量加一
export const updateviewsApi = (data: { goods_id: string }) => http({ url: '/api/my/updateviews', method: 'post', data })
// 商品购买
export const buygoodsitemApi = (data: { goods_id: number }): any => http({ url: '/api/buygoodsitem', method: 'post', data })


// 获取待发货的商品订单列表
export const gettradeordergoodsApi = (): any => http({ url: '/api/gettradeordergoods', method: 'post' })
// 获取已发货的商品订单列表
export const getshippedordergoodsApi = (): any => http({ url: '/api/getshippedgoods', method: 'post' })



// 获取已完成商品订单
export const getfinishordergoodsApi = (): any => http({ url: '/api/getfinishordergoods', method: 'post' })
// 删除已完成的商品订单
export const delfinishedgoodsApi = (data: { order_id: number }): any => http({ url: '/api/delfinishedgoods', method: 'post', data })
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
// 删除交易完成的商品
export const deltradefinishedgoodsAPi = (data: { goods_id: number }): any =>
    http({ url: '/api/deltradefinishedgoods', method: 'post', data })



// 添加收藏
export const addcollectgoodsApi = (data: { goods_id: number }): any => http({ url: '/api/addcollectgoods', method: 'post', data })
// 获取收藏列表
export const getcollectgoodsApi = (): any => http({ url: '/api/getcollectgoods', method: 'post' })
// 删除收藏
export const delcollectgoodsApi = (data: { collect_id: number }): any => http({ url: '/api/delcollectgoods', method: 'post', data })
// 失效的商品
export const expirecollectgoodsApi = (): any => http({ url: '/api/expirecollectgoods', method: 'post' })



// 获取商品分类菜单
export const getgoodskindApi = (): any => http({ url: '/api/my/getgoodskind', method: 'get' })



// 我的发布
// 获取我发布的商品
export const getpubgoodsApi = (): any => http({ url: '/api/getpubgoods', method: 'post' })
// 获取下架的商品
export const getremovegoodsApi = (): any => http({ url: '/api/getremovegoods', method: 'post' })
// 修改发布商品的详情
export const updategoodsdescApi = (data: Iupdategoodsdesc): any => http({ url: '/api/updategoodsdesc', method: 'post', data })
// 下架我的发布
export const delgoodsitemApi = (data: { goods_id: string }): any => http({ url: '/api/delgoodsitem', method: 'post', data })
// 删除下架的商品
export const removegoodsApi = (data: { goods_id: string }): any => http({ url: '/api/removegoods', method: 'post', data })
// 重新上架商品
export const readdpubgoodsApi = (data: { goods_id: string }): any => http({ url: '/api/readdpubgoods', method: 'post', data })