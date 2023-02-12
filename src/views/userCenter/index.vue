<!-- 个人中心 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import imgUrl from '@/assets/pig.jpeg'
import { useUserStore } from '@/store/index'
import { showFailToast } from 'vant';


const userStore = useUserStore()
const router = useRouter()
const toLoginOrRegister = () => {
    router.push({
        path: '/login'
    })
}

const data = [
    {
        path: '/userCenter/userInfo', icon: 'contact', title: '个人中心',
    },
    {
        path: '/userCenter/getGoods', icon: 'cart-o', title: '我的订单',
    },
    {
        path: '/userCenter/sellGoods', icon: 'logistics', title: '交易中心',
    },
    {
        path: '/userCenter/pubGoods', icon: 'back-top', title: '我的发布',
    },
    {
        path: '/userCenter/collectGoods', icon: 'star-o', title: '我的收藏',
    },
]

const toKind = (path: string) => {
    if (Object.keys(userStore.user).length === 0) return showFailToast('请先登录！')
    router.push({
        path: path
    })
}


</script>

<template>
    <div class="container">
        <van-nav-bar title='用户中心' fixed />
        <div class="container_header" v-if="Object.keys(userStore.user).length === 0">
            <div @click="toLoginOrRegister">
                <img :src="imgUrl" alt="用户头像">
                <span class="container_header_span">登录/注册</span>
            </div>
        </div>
        <div v-else class="container_header">
            <img :src="imgUrl" alt="用户头像">
            <span class="container_header_span">{{ userStore.user.user_name }}</span>
        </div>
        <van-cell-group inset style="margin-top:2vh">
            <van-cell :title=item.title :icon=item.icon v-for="item in data" :key="item.path"
                @click="toKind(item.path)">
                <template #right-icon>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<style lang='scss' scoped>
.container {

    &_header {
        height: 30vh;
        line-height: 30vh;
        background-color: #68A1D9;
        text-align: center;


        img {
            height: 60px;
            border-radius: 50%;
            margin-top: 10vh;
        }

        &_span {
            position: absolute;
            top: 6vh;
            left: 41.2vw;
            color: white;
        }
    }
}
</style>