import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/test",
        name: "test",
        component: () => import("@/views/test.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/login/index.vue"),
    },
    {
        path: "/",
        name: "homePage",
        component: () => import("@/views/homePage/index.vue"),
        children: [
            {
                path: "home",
                name: "home",
                component: () => import("@/views/home/index.vue"),
            },
            {
                path: "pubGoods",
                name: "pubGoods",
                component: () => import("@/views/pubGoods/index.vue"),
            },
            {
                path: "userCenter",
                name: "userCenter",
                component: () => import("@/views/userCenter/index.vue"),
            }
        ]
    },
    // 搜索页
    {
        path: "/search",
        name: "search",
        component: () => import("@/views/home/search/index.vue"),
    },
    // 推荐选项卡
    {
        path: "/home/allShop",
        name: "allShop",
        component: () => import("@/views/home/category/allShop/index.vue"),
    },
    {
        path: "/home/newShop",
        name: "newShop",
        component: () => import("@/views/home/category/newShop/index.vue"),
    },
    {
        path: "/home/hotShop",
        name: "hotShop",
        component: () => import("@/views/home/category/hotShop/index.vue"),
    },
    {
        path: "/home/freeShop",
        name: "freeShop",
        component: () => import("@/views/home/category/freeShop/index.vue"),
    },
    // 商品详情
    {
        path: "/goodsDesc/:id",
        name: "goodsDesc",
        component: () => import("@/views/goodsDesc/index.vue"),
    },
    // 个人中心
    {
        path: "/userCenter/userInfo",
        name: "userInfo",
        component: () => import("@/views/userCenter/userInfo/index.vue"),
    },
    {
        path: "/userCenter/getGoods",
        name: "getGoods",
        component: () => import("@/views/userCenter/getGoods/index.vue"),
    },
    {
        path: "/userCenter/sellGoods",
        name: "sellGoods",
        component: () => import("@/views/userCenter/sellGoods/index.vue"),
    },
    {
        path: "/userCenter/pubGoods",
        name: "pubGoodsFinish",
        component: () => import("@/views/userCenter/pubGoods/index.vue"),
    },
    {
        path: "/userCenter/pubGoods/updategoodsdesc/:id",
        name: "updategoodsdesc",
        component: () => import("@/views/userCenter/pubGoods/updateGoodsDesc/index.vue"),
    },
    {
        path: "/userCenter/collectGoods",
        name: "collectGoods",
        component: () => import("@/views/userCenter/collectGoods/index.vue"),
    },
    // 编辑个人信息
    {
        path: "/userCenter/userInfo/updateHeaderImg",
        name: "updateHeaderImg",
        component: () => import("@/views/userCenter/userInfo/headerImg/index.vue"),
    },
    {
        path: "/userCenter/userInfo/updateNickname",
        name: "updateNickname",
        component: () => import("@/views/userCenter/userInfo/nickname/index.vue"),
    },
    {
        path: "/userCenter/userInfo/updatePwd",
        name: "updatePwd",
        component: () => import("@/views/userCenter/userInfo/pwd/index.vue"),
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router