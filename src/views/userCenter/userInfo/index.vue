<!-- 用户信息 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';

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
        path: '/userCenter/userInfo/updatePwd', icon: 'Lock', title: '密码',
    },
]

</script>

<template>
    <div>
        <van-nav-bar title="用户中心" left-text="返回" left-arrow @click-left="onClickLeft" />
        <van-cell :title=item.title is-link :to=item.path v-for="item in data" :key="item.path" />
    </div>
</template>

<style lang='scss' scoped>

</style>