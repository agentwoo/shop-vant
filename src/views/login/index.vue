<!-- 登录 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';


import { loginApi } from '@/http';
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}
// tab
const activeName = ref('a');

//登录
const username = ref('');
const password = ref('');
const onSubmit = (values: any) => {
    console.log('submit', values);
};



async function login() {
    let res = await loginApi({
        username: username.value,
        password: password.value
    })
    if (res.ok) {
        // router.push('/home')
        // successMessage('登录成功')

        // username.value = ''
        // password.value = ''


        console.log('登录成功');
        console.log(res);

        localStorage.setItem('token', res.token)

    } else {
        // errMessage(res.err)
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
                            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                                :rules="[{ required: true, message: '请填写用户名' }]" />
                            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                                :rules="[{ required: true, message: '请填写密码' }]" />
                        </van-cell-group>
                        <div style="margin: 16px;">
                            <van-button round block type="primary" @click="login">
                                登录
                            </van-button>
                        </div>
                    </van-form>
                </van-tab>
                <van-tab title="注册" name="register">
                    <van-form @submit="onSubmit" class="form">
                        <van-cell-group inset>
                            <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                                :rules="[{ required: true, message: '请填写用户名' }]" />
                            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                                :rules="[{ required: true, message: '请填写密码' }]" />
                            <van-field v-model="password" type="password" name="确认密码" label="确认密码" placeholder="密码"
                                :rules="[{ required: true, message: '请填写密码' }]" />
                        </van-cell-group>
                        <div style="margin: 16px;">
                            <van-button round block type="primary" native-type="submit">
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