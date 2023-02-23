<!-- 更改头像 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store';
import { updateuserImgApi } from '@/http/index'
import axios from 'axios';
import { showFailToast, showSuccessToast } from 'vant';

// navbar
const router = useRouter()
const onClickLeft = () => {
    router.back()
}

// 修改头像
const userStore = useUserStore()
const data = reactive({
    showbutton: false,
    showpicture: true,
    user_img: '',
    // 图片
    fileTitle: [],
})

// 提交图片
async function onUpload(upload_file: any) {
    upload_file.status = 'uploading'
    const formData = new FormData()
    formData.append('cover_img', upload_file.file)
    const res = await axios.post('/api/my/uploadfile', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'charset': 'utf-8',
        }
    })
    if (res.data.ok) {
        upload_file.status = 'done'
        data.user_img = `http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`
        data.showbutton = true
    } else {
        upload_file.status = 'failed'
    }
}

// 取消预览
const deleteimg = () => {
    data.showbutton = false
}

// 限制图片的大小及后缀名
const beforeRead = (file: any) => {
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
        if (file.size / 1024 / 1024 > 10) {
            showFailToast('图片大小不能超过10mb');
            return false
        }
    } else {
        showFailToast('图片格式必须是jpg/jepg/png');
        return false
    }
    return true
};

// 修改用户信息中的图片信息
async function updateuserImg() {
    // 修改数据库图片
    let resupdate = await updateuserImgApi({ user_img: data.user_img, user_name: userStore.user.user_name })
    if (!resupdate.ok) showFailToast('系统繁忙！')

    // 关闭图片预览
    data.showpicture = false
    // 更改本地图片
    let user_info = JSON.parse(localStorage.getItem('userInfo') as string)
    user_info.user_img = data.user_img
    localStorage.setItem('userInfo', JSON.stringify(user_info))
    // 更改store中的数据
    userStore.user.user_img = data.user_img
    // showSuccessToast('更新成功！')
}

</script>

<template>
    <div class="container">
        <van-nav-bar title="更改头像" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="container_content">
            <div class="container_content_img">
                <van-image width="20rem" height="20rem" fit="cover" position="center" :src="userStore.user.user_img" />
            </div>
            <div class="container_content_edit">
                <div v-if="data.showpicture">
                    <van-uploader v-model="data.fileTitle" multiple :max-count="1" :after-read="onUpload"
                        @delete="deleteimg" :before-read='beforeRead'>
                        <van-button round type="primary">
                            更换头像
                        </van-button>
                    </van-uploader>
                </div>
                <br>
                <van-button round type="primary" @click="updateuserImg" style="margin-top:2vh" v-if="data.showbutton">
                    确定更换
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

        :deep(.van-button) {
            width: 330px;
        }
    }
}
</style>