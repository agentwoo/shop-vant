<!-- 更改头像 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';
// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

// 修改头像
const userStore = useUserStore()
const updateHeaderImg = () => {
    // 修改头像逻辑
    console.log('修改头像');
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="更改头像" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_content">
            <div class="container_content_img">
                <van-image width="20rem" height="20rem" fit="cover" position="center"
                    :src="userStore.user.user_head_img" />
            </div>
            <div class="container_content_edit">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.container {
    &_header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1;
    }

    &_content {
        margin-top: 50px;

        &_img {
            text-align: center;
        }

        &_edit {
            padding: 0 10%;
            margin-top: 5vh;

        }
    }
}
</style>