<!-- 更改密码 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';

// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

// 修改密码
const oldPassword = ref('');
const newPassword = ref('');
const checkPassword = ref('')
const onSubmit = (values: any) => {
    console.log('submit', values);
};


</script>

<template>
    <div class="container">
        <van-nav-bar title="更改密码" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="oldPassword" name="原密码" label="原密码" placeholder="原密码"
                        :rules="[{ required: true, message: '请填写原密码' }]" />
                    <van-field v-model="newPassword" type="password" name="新密码" label="新密码" placeholder="新密码"
                        :rules="[{ required: true, message: '请填写新密码' }]" />
                    <van-field v-model="checkPassword" type="password" name="确认新密码" label="确认新密码" placeholder="确认新密码"
                        :rules="[{ required: true, message: '请再次填写新密码' }]" />
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