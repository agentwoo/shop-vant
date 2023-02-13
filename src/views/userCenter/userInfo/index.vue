<!-- 用户信息 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/index'
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant';

const userStore = useUserStore()
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}
const data = [
    {
        path: '/userCenter/userInfo/updateHeaderImg', icon: 'Picture', title: '头像',
    },
    {
        path: '/userCenter/userInfo/updateNickname', icon: 'User', title: '昵称',
    },
    {
        path: '/userCenter/userInfo/updatePwd', icon: 'Lock', title: '修改密码',
    },
]

const logout = () => {
    showConfirmDialog({
        title: '提示',
        message:
            '确认退出登录?',
    }).then(() => {
        router.replace({ path: '/login' })
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.removeItem('logintimestamp')
        userStore.token = ''
        userStore.user = ''
        showSuccessToast('退出登录成功！')
    }).catch(() => {

    });

}



</script>

<template>
    <div>
        <van-nav-bar title="用户中心" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell :title=item.title is-link :to=item.path v-for="item in data" :key="item.path" />
        <div style="margin: 16px;">
            <van-button round block type="primary" @click="logout()">
                退出登录
            </van-button>
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>