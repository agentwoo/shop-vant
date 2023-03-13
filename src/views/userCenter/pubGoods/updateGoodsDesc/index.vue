<!-- 修改商品详情 -->
<script lang='ts' setup>
import { onMounted, reactive, watch, ref } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'
import router from '@/router';
import { useRoute } from 'vue-router';
import axios from 'axios';
import 'vant/es/toast/style';

import { getgoodsdescApi, updategoodsdescApi } from '@/http/index'
// 数据
const data = reactive({
    // 获取路由商品id
    goods_id: '',

    // 后台获取原先商品详情
    goods_desc: {
        goods_id: 0,
        goods_title: '',
        goods_desc: '',
        goods_origin_price: '',
        goods_present_price: '',
        goods_title_img: '',
        goods_contact: '',
        goods_pid: '',
        goods_kind: '',
        goods_pub_time: '',
        goods_views: '',
        is_delgoods: '',
        goods_status: '',
        pub_user_id: 0,
        goods_swiper_img1: '',
        goods_swiper_img2: '',
        goods_swiper_img3: '',
        goods_swiper_img4: '',
    },
    // 图片
    fileTitle: [],
    deletable: true,
    // 详情图
    fileTitle1: [],
    deletable1: true,
    fileTitle2: [],
    deletable2: true,
    fileTitle3: [],
    deletable3: true,
    fileTitle4: [],
    deletable4: true,
})



// 表单提交
async function onSubmit(values: any) {
    let goodsInfo = values
    if (
        data.goods_desc.goods_title_img !== ''
        && data.goods_desc.goods_swiper_img1 !== ''
        && data.goods_desc.goods_swiper_img2 !== ''
        && data.goods_desc.goods_swiper_img3 !== ''
        && data.goods_desc.goods_swiper_img4 !== ''
    ) {
        let res = await updategoodsdescApi({
            goods_id: data.goods_desc.goods_id,
            goods_title: goodsInfo.goods_title,
            goods_desc: goodsInfo.goods_desc,
            goods_origin_price: goodsInfo.origin_price,
            goods_present_price: goodsInfo.present_price,
            goods_contact: goodsInfo.contact,
            goods_title_img: data.goods_desc.goods_title_img,
            goods_swiper_img1: data.goods_desc.goods_swiper_img1,
            goods_swiper_img2: data.goods_desc.goods_swiper_img2,
            goods_swiper_img3: data.goods_desc.goods_swiper_img3,
            goods_swiper_img4: data.goods_desc.goods_swiper_img4,
        })

        if (!res.ok) return showFailToast(res.message)
        showSuccessToast('修改成功！')
        data.deletable = false
        data.deletable1 = false
        data.deletable2 = false
        data.deletable3 = false
        data.deletable4 = false
    } else {
        return showFailToast('图片不能为空')
    }
}


// 获取商品详情
onMounted(async () => {
    let res = await getgoodsdescApi({ goods_id: data.goods_id })
    if (!res.ok) return showFailToast('系统繁忙！')
    data.goods_desc = res.data[0]

    data.fileTitle = res.data.goods_title_img
    data.fileTitle1 = res.data.goods_swiper_img1
    data.fileTitle2 = res.data.goods_swiper_img2
    data.fileTitle3 = res.data.goods_swiper_img3
    data.fileTitle4 = res.data.goods_swiper_img4
})

// 获取商品的id
const route = useRoute()
watch(() => route.params, (newVal) => {
    data.goods_id = newVal.id as string
}, {
    immediate: true,
})

const onClickLeft = () => {
    router.back()
}

// 验证规则
const checkoriginprice = (value: string) => {
    if (!value.trim()) {
        return '不能为空'
    } else if (Number(value.trim()) - Number(data.goods_desc.goods_origin_price) >= 0) {
        return '现价不能超过或等于原价'
    } else {
        return true
    }
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
        data.goods_desc.goods_title_img = `http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`
    } else {
        upload_file.status = 'failed'
    }
}
// 删除封面图预览
const delCoverImg = (file: any, detail: any) => {
    data.goods_desc.goods_title_img = ''
    data.fileTitle.splice(detail.index, 1)
    return true
}

async function onUpload1(upload_file: any) {
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
        data.goods_desc.goods_swiper_img1 = `http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`
    } else {
        upload_file.status = 'failed'
    }
}
// 删除封面图预览
const delCoverImg1 = (file: any, detail: any) => {
    data.goods_desc.goods_swiper_img1 = ''
    data.fileTitle1.splice(detail.index, 1)
    return true
}

async function onUpload2(upload_file: any) {
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
        data.goods_desc.goods_swiper_img2 = `http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`
    } else {
        upload_file.status = 'failed'
    }
}
// 删除封面图预览
const delCoverImg2 = (file: any, detail: any) => {
    data.goods_desc.goods_swiper_img2 = ''
    data.fileTitle2.splice(detail.index, 1)
    return true
}
async function onUpload3(upload_file: any) {
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
        data.goods_desc.goods_swiper_img3 = `http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`
    } else {
        upload_file.status = 'failed'
    }
}
// 删除封面图预览
const delCoverImg3 = (file: any, detail: any) => {
    data.goods_desc.goods_swiper_img3 = ''
    data.fileTitle3.splice(detail.index, 1)
    return true
}
async function onUpload4(upload_file: any) {
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
        data.goods_desc.goods_swiper_img4 = `http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`
    } else {
        upload_file.status = 'failed'
    }
}
// 删除封面图预览
const delCoverImg4 = (file: any, detail: any) => {
    data.goods_desc.goods_swiper_img4 = ''
    data.fileTitle4.splice(detail.index, 1)
    return true
}
</script>

<template>
    <div class="container">
        <van-nav-bar title="修改详情" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <div class="container_form">
            <van-form @submit="onSubmit" ref="formRef">
                <van-cell-group inset>
                    <van-field v-model="data.goods_desc.goods_title" name="goods_title" placeholder="标题" label="标题"
                        :maxlength="10" :rules="[{ required: true, message: '请填写标题' }]" required />
                    <van-field v-model="data.goods_desc.goods_desc" name="goods_desc" placeholder="详情" label="详情"
                        :maxlength="20" :rules="[{ required: true, message: '请填写详情' }]" required />
                    <van-field v-model="data.goods_desc.goods_origin_price" name="origin_price" type="number"
                        placeholder="原价" label="原价" :maxlength="5" :rules="[{ required: true, message: '请填写原价' }]"
                        required />
                    <van-field v-model="data.goods_desc.goods_present_price" name="present_price" type="number"
                        placeholder="现价" label="现价" :maxlength="5" :rules="[{ validator: checkoriginprice }]" required />
                    <van-field v-model="data.goods_desc.goods_contact" name="contact" placeholder="联系方式" label="联系方式"
                        :maxlength="20" :rules="[{ required: true, message: '联系方式不能为空' }]" required />
                    <van-field name="uploader" label="封面图" required>
                        <template #input>
                            <van-uploader v-model="data.fileTitle" multiple :max-count="1" :after-read="onUpload"
                                :before-read='beforeRead' :before-delete="delCoverImg" :deletable='data.deletable'>
                                <van-image width="80" height="80" :src="data.goods_desc.goods_title_img" />
                            </van-uploader>
                        </template>
                    </van-field>
                    <van-field name="uploader1" label="详情图" required>
                        <template #input>
                            <van-uploader v-model="data.fileTitle1" multiple :max-count="1" :after-read="onUpload1"
                                :before-read='beforeRead' :before-delete="delCoverImg1" :deletable='data.deletable1'>
                                <van-image width="80" height="80" :src="data.goods_desc.goods_swiper_img1" />
                            </van-uploader>
                            <van-uploader v-model="data.fileTitle2" multiple :max-count="1" :after-read="onUpload2"
                                :before-read='beforeRead' :before-delete="delCoverImg2" :deletable='data.deletable2'>
                                <van-image width="80" height="80" :src="data.goods_desc.goods_swiper_img2" />
                            </van-uploader>
                            <van-uploader v-model="data.fileTitle3" multiple :max-count="1" :after-read="onUpload3"
                                :before-read='beforeRead' :before-delete="delCoverImg3" :deletable='data.deletable3'>
                                <van-image width="80" height="80" :src="data.goods_desc.goods_swiper_img3" />
                            </van-uploader>
                            <van-uploader v-model="data.fileTitle4" multiple :max-count="1" :after-read="onUpload4"
                                :before-read='beforeRead' :before-delete="delCoverImg4" :deletable='data.deletable4'>
                                <van-image width="80" height="80" :src="data.goods_desc.goods_swiper_img4" />
                            </van-uploader>
                        </template>
                    </van-field>
                </van-cell-group>
                <div style="margin: 16px;">
                    <van-button round block type="primary" native-type="submit">
                        确认修改
                    </van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<style lang='scss' scoped>
.container {
    &_form {
        margin-top: 50px;
    }
}
</style>