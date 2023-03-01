<!-- 个人中心 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import imgUrl from '@/assets/pig.jpeg'
import { useUserStore } from '@/store/index'
import { showFailToast, showDialog } from 'vant';


const userStore = useUserStore()
const router = useRouter()
const toLoginOrRegister = () => {
    router.push({
        path: '/login'
    })
}

const data = [
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
    if (Object.keys(userStore.user).length === 0 && Object.keys(userStore.token).length === 0) return showFailToast('请先登录！')
    router.push({
        path: path
    })
}

const toUserInfo = () => {
    router.push({
        path: '/userCenter/userInfo'
    })
}

async function tip() {
    showDialog({
        message: '反馈邮箱：123456@qq.com'
    }).then(() => {
        // on close
    });
}
</script>

<template>
    <div class="container">
        <van-nav-bar title='用户中心' fixed />
        <div class="container_header" v-if="Object.keys(userStore.user).length === 0">
            <div @click="toLoginOrRegister">
                <img :src="imgUrl" alt="用户头像">
                <div class="container_header_div">登录/注册</div>
            </div>
        </div>
        <div v-else class="container_header">
            <div @click="toUserInfo">
                <img :src="userStore.user.user_img" alt="用户头像">
                <div class="container_header_div">{{ userStore.user.user_name }}</div>
            </div>
        </div>
        <van-cell-group inset style="margin-top:2vh">
            <van-cell :title=item.title :icon=item.icon v-for="item in data" :key="item.path" @click="toKind(item.path)">
                <template #right-icon>
                    <van-icon name="arrow" />
                </template>
            </van-cell>
        </van-cell-group>
        <van-cell-group inset style="margin-top:2vh">
            <van-cell title='反馈问题' icon=service-o @click="tip">
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
        background-color: #68A1D9;
        text-align: center;

        img {
            height: 60px;
            width: 60px;
            border-radius: 50%;
            margin-top: 10vh;
        }

        &_div {
            color: white;
        }
    }
}
</style>