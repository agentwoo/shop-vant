<!-- 登录 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import { showSuccessToast, showFailToast } from 'vant';

import { useUserStore } from '@/store/index';
import { loginApi, registerApi } from '@/http';
import 'vant/es/toast/style';

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

// 获取当前时间戳
let nowtimestamp = new Date().getTime()

//登录
let logformRef = ref()
async function login() {
    const $form = logformRef.value
    if (!$form) return
    const valid = await $form.validate()

    let res = await loginApi({
        username: data.login.username.trim(),
        password: data.login.password.trim()
    })

    if (res.ok) {
        // 获取用户信息
        useUserStore().user = res.userInfo
        localStorage.setItem('token', JSON.stringify(res.token))
        localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
        localStorage.setItem('logintimestamp', JSON.stringify(nowtimestamp))

        router.push('/userCenter')
        showSuccessToast(res.message)

        data.login.username = ''
        data.login.password = ''

    } else {
        showFailToast(res.message)
    }
}

// 用户名
const username = (val: any) => {
    if (!val.trim()) {
        return '请输入用户名'
    } else if (val.trim().length < 1 || val.trim().length > 10) {
        return '用户名长度不超过10个字'
    } else {
        return true
    }
}
// 密码
const password = (val: any) => {
    if (!val.trim()) {
        return '请输入密码'
    } else if (val.trim().length < 6 || val.trim().length > 12) {
        return '密码应在6-12个字'
    } else {
        return true
    }
}
// 二次检验密码
const checkpassword = (val: any) => {
    if (!val.trim()) {
        return '请确认密码'
    } else if (val.trim() !== data.register.password) {
        return '密码输入不一致'
    } else {
        return true
    }
}
let regformRef = ref()
// 注册
async function register() {
    const $form = regformRef.value
    if (!$form) return
    const valid = await $form.validate()

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
        <van-nav-bar title="登录/注册" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_nav">
            <van-tabs v-model:active="activeName">
                <van-tab title="登录" name="login">
                    <van-form class="form" ref="logformRef">
                        <van-cell-group inset>
                            <van-field v-model="data.login.username" name="用户名" label="用户名" placeholder="用户名" required
                                :rules="[{ required: true, message: '请填写用户名' }]" />
                            <van-field v-model="data.login.password" type="password" name="密码" label="密码" placeholder="密码"
                                required :rules="[{ required: true, message: '请填写密码' }]" />
                        </van-cell-group>
                        <div style="margin: 16px;">
                            <van-button round block type="primary" @click="login">
                                登录
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
                <van-tab title="注册" name="register">
                    <van-form class="form" ref="regformRef">
                        <van-cell-group inset>
                            <van-field v-model="data.register.username" name="用户名" label="用户名" placeholder="用户名" required
                                :rules="[{ validator: username }]" />
                            <van-field v-model="data.register.password" type="password" name="密码" label="密码"
                                placeholder="密码" required :rules="[{ validator: password }]" />
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