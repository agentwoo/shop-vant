<!-- 登录 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';

import { useUserStore } from '@/store/index';
import { loginApi, registerApi } from '@/http';

// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}
// tab
const activeName = ref('a');

const data = reactive({
    login: {
        username: '',
        password: ''
    },
    register: {
        username: '',
        password: '',
        checkpassword: '',
    }
})
//登录
async function login() {
    let res = await loginApi({
        username: data.login.username.trim(),
        password: data.login.password.trim()
    })

    if (res.ok) {
        // router.push('/home')
        router.push('/userCenter')
        showSuccessToast('登录成功')

        // 获取用户信息
        useUserStore().user = res.userInfo

        data.login.username = ''
        data.login.password = ''
        localStorage.setItem('token', JSON.stringify(res.token))
        localStorage.setItem('userInfo', JSON.stringify(res.userInfo))

    } else {
        showFailToast(res.err)
    }
}

// 注册
const checkpassword = (val: any) => {
    if (!val.trim()) {
        return '请确认密码'
    } else if (val.trim() !== data.register.password) {
        return '密码输入不一致'
    } else {
        return true
    }
}
async function register() {
    let res = await registerApi({
        username: data.register.username.trim(),
        password: data.register.password.trim()
    })
    if (res.ok) {
        showSuccessToast('注册成功，请点击登录')

        data.register.username = ''
        data.register.password = ''
        data.register.checkpassword = ''
    } else {
        showFailToast(res.message)
    }
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="用户中心" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_nav">
            <van-tabs v-model:active="activeName">
                <van-tab title="登录" name="login">
                    <van-form class="form">
                        <van-cell-group inset>
                            <van-field v-model="data.login.username" name="用户名" label="用户名" placeholder="用户名" required
                                :rules="[{ required: true, message: '请填写用户名' }]" />
                            <van-field v-model="data.login.password" type="password" name="密码" label="密码"
                                placeholder="密码" required :rules="[{ required: true, message: '请填写密码' }]" />
                        </van-cell-group>
                        <div style="margin: 16px;">
                            <van-button round block type="primary" @click="login">
                                登录
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
                <van-tab title="注册" name="register">
                    <van-form class="form">
                        <van-cell-group inset>
                            <van-field v-model="data.register.username" name="用户名" label="用户名" placeholder="用户名"
                                required :rules="[{ required: true, message: '请填写用户名' }]" />
                            <van-field v-model="data.register.password" type="password" name="密码" label="密码"
                                placeholder="密码" required :rules="[{ required: true, message: '请填写密码' }]" />
                            <van-field v-model="data.register.checkpassword" type="password" name="确认密码" label="确认密码"
                                placeholder="密码" required :rules="[{ validator: checkpassword }]" />
                        </van-cell-group>
                        <div style="margin: 16px;">
                            <van-button round block type="primary" @click="register">
                                注册
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<style lang='scss' scoped>
form {
    margin-top: 5vh;
}
</style>