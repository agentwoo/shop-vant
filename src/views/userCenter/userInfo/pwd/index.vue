<!-- 更改密码 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { updatepasswodApi } from '@/http/index'
import { useUserStore } from '@/store/index'
import { showFailToast, showSuccessToast } from 'vant';


// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

// 修改密码

const data = reactive({
    oldPassword: '',
    newPassword: '',
    checkPassword: '',
})


const checkpassword = (val: any) => {
    if (!val.trim()) {
        return '请确认密码'
    } else if (val.trim() !== data.newPassword) {
        return '密码输入不一致'
    } else {
        return true
    }
}

interface Idata {
    password: '',
    newpassword: '',
    checknewpassword: '',
}
const userStore = useUserStore()
// 获取当前时间戳
let nowtimestamp = new Date().getTime()
async function onSubmit(values: Idata) {
    let user_name = userStore.user.user_name
    let res = await updatepasswodApi({ user_name: user_name, password: values.newpassword })
    if (!res.ok) showFailToast(res.message)


    // 获取用户信息
    useUserStore().user = res.userInfo
    localStorage.setItem('token', JSON.stringify(res.token))
    localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
    localStorage.setItem('logintimestamp', JSON.stringify(nowtimestamp))

    data.oldPassword = ''
    data.newPassword = ''
    data.checkPassword = ''
    showSuccessToast('修改密码成功!')
    router.replace({ path: '/userCenter' })
}


</script>

<template>
    <div class="container">
        <van-nav-bar title="更改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="data.oldPassword" name="password" label="原密码" placeholder="原密码" maxlength="10"
                        type="password" :rules="[{ required: true, message: '请填写原密码' }]" />
                    <van-field v-model="data.newPassword" type="password" name="newpassword" label="新密码"
                        placeholder="新密码" maxlength="12" :rules="[{ required: true, message: '请填写新密码' }]" />
                    <van-field v-model="data.checkPassword" type="password" name="checknewpassword" label="确认新密码"
                        placeholder="确认新密码" :rules="[{ validator: checkpassword }]" />
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        提交
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