<!-- 更改昵称 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';

// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

// 修改昵称
const username = ref('');
const password = ref('');
const onSubmit = (values: any) => {
    console.log('submit', values);
};

</script>

<template>
    <div class="container">
        <van-nav-bar title="更改昵称" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_form">
            <van-form @submit="onSubmit">
                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
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