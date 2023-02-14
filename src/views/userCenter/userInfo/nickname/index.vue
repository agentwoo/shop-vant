<!-- 更改昵称 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { showConfirmDialog, showFailToast, showSuccessToast } from 'vant';

import { useUserStore } from '@/store';
import { updateuserNameApi } from '@/http/index'
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

const userStore = useUserStore()
// 修改昵称
const data = reactive({
    user_name: userStore.user.user_name,
    user_id: userStore.user.user_id
})

// 修改用户名验证规则
const checknickname = (val: any) => {
    if (!val.trim()) {
        return '请填写更改的用户名'
    } else if (val.trim() === data.user_name) {
        return '不允许提交原用户名'
    } else {
        return true
    }
}

async function onSubmit() {
    let res = await updateuserNameApi({ user_name: data.user_name.trim(), user_id: data.user_id })
    if (!res.ok) showFailToast(res.message)
    // 修改本地信息
    let user_info = JSON.parse(localStorage.getItem('userInfo') as string)
    user_info.user_name = data.user_name
    localStorage.setItem('userInfo', JSON.stringify(user_info))
    // 修改store
    userStore.user.user_name = data.user_name

    showSuccessToast(res.message)
}

const onsubmit = () => {
    showConfirmDialog({
        title: '提示',
        message: '确认修改?',
    }).then(() => {
        onSubmit()
    }).catch(() => {
        showFailToast('取消修改！')
    });
}


</script>

<template>
    <div class="container">
        <van-nav-bar title="更改昵称" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_form">
            <van-form @submit="onSubmit">
                <van-field v-model="data.user_name" name="user_name" label="用户名" placeholder="用户名"
                    :rules="[{ validator: checknickname }]" :maxlength="7" />
                <div style="margin: 16px;">
                    <van-button round block type="primary" @click="onsubmit">
                        修改昵称
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    &_form {
        margin-top: 5vh;
    }
}
</style>