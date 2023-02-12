<!-- 发布商品 -->
<script lang='ts' setup>
import { onMounted, reactive } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'
import { useMenusStore } from '@/store/index'
import router from '@/router';


import { pubgoodsAPi, getgoodskindApi } from '@/http/index'
import axios from 'axios';

const menusStore = useMenusStore()
// 数据
const data = reactive({
    // 商品发布
    pub_goods: {
        goods_title: '',
        goods_desc: '',
        origin_price: '',
        present_price: '',
        contact: '',
        cover_img: '',
        cover_list: [] as string[],
    },

    // 类型选择器
    columns: menusStore.menus,
    result: '',
    goodskingid: '',
    showPicker: false,
    // 图片
    fileTitle: [],
    // 详情图
    fileList: [],
})

// 验证规则
const validatorTitle = (val: any) => {
    if (val.length !== 0) {
        if (val.length > 8) {
            return '请输入7个以内的字符'
        } else {
            return true
        }
    } else {
        return '不能为空'
    }
}
const validatorDesc = (val: any) => {
    if (val.length !== 0) {
        if (val.length > 21) {
            return '请输入20个以内的字符'
        } else {
            return true
        }
    } else {
        return '不能为空'
    }
}
const validatorOrginPrice = (val: any) => {
    if (val.length !== 0) {
        if (val.length > 4) {
            return '请输入5个以内的字符'
        } else {
            return true
        }
    } else {
        return '不能为空'
    }
}

// 类型选择器
const onConfirm = ({ selectedOptions }: { selectedOptions: { text: string, value: string }[] }) => {
    data.result = selectedOptions[0]?.text;
    data.goodskingid = selectedOptions[0]?.value;
    data.showPicker = false;
};


// 表单提交
async function onSubmit(values: any) {
    let goodsInfo = values

    let res = await pubgoodsAPi({
        goods_title: goodsInfo.goods_title,
        goods_desc: goodsInfo.goods_desc,
        goods_origin_price: goodsInfo.origin_price,
        goods_present_price: goodsInfo.present_price,
        goods_title_img: data.pub_goods.cover_img,
        goods_contact: goodsInfo.contact,
        goods_pid: data.goodskingid,
        goods_kind: goodsInfo.kind,
        goods_swiper_img1: data.pub_goods.cover_list[0],
        goods_swiper_img2: data.pub_goods.cover_list[1],
        goods_swiper_img3: data.pub_goods.cover_list[2],
        goods_swiper_img4: data.pub_goods.cover_list[3],
    })

    if (!res.ok) return showFailToast(res.message)
    router.push({ path: '/userCenter/pubGoods' })
    showSuccessToast('发布成功！')


    data.pub_goods.goods_title = '';
    data.pub_goods.goods_desc = '';
    data.pub_goods.origin_price = '';
    data.pub_goods.present_price = '';
    data.pub_goods.contact = '';
    data.fileTitle = [];
    data.fileList = [];
    data.result = ''
}

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
        data.pub_goods.cover_img = `http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`
    } else {
        upload_file.status = 'failed'
    }
}

// 详情图
async function onUploadList(upload_file: any) {
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
        data.pub_goods.cover_list.push(`http://localhost:3000/api/my/uploads/goods_pic/${res.data.data}`)

    } else {
        upload_file.status = 'failed'
    }
}


onMounted(async () => {
    // 获取分类菜单
    let res = await getgoodskindApi()
    if (!res.ok) showFailToast('系统繁忙')
    data.columns = res.data
    menusStore.menus = res.data
})


</script>

<template>
    <div class="container">
        <van-nav-bar title='商品发布' fixed />
        <div class="container_form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="data.pub_goods.goods_title" name="goods_title" placeholder="标题" label="标题"
                        :rules="[{ validator: validatorTitle }]" required />
                    <van-field v-model="data.pub_goods.goods_desc" name="goods_desc" placeholder="详情" label="详情"
                        :rules="[{ validator: validatorDesc }]" required />
                    <van-field v-model="data.pub_goods.origin_price" name="origin_price" type="number" placeholder="原价"
                        label="原价" :rules="[{ validator: validatorOrginPrice }]" required />
                    <van-field v-model="data.pub_goods.present_price" name="present_price" type="number"
                        placeholder="现价" label="现价" :rules="[{ validator: validatorOrginPrice }]" required />
                    <van-field v-model="data.pub_goods.contact" name="contact" placeholder="联系方式" label="联系方式"
                        :rules="[{ validator: validatorDesc }]" required />
                    <!-- 分类 -->
                    <van-field v-model="data.result" is-link readonly name="kind" label="分类" placeholder="点击选择商品分类"
                        @click="data.showPicker = true" required />
                    <van-popup v-model:show="data.showPicker" position="bottom">
                        <van-picker :columns="data.columns" @confirm="onConfirm" @cancel="data.showPicker = false" />
                    </van-popup>
                    <!-- 图片 -->
                    <van-field name="uploader" label="封面图" required>
                        <template #input>
                            <van-uploader v-model="data.fileTitle" multiple :max-count="1" :after-read="onUpload" />
                        </template>
                    </van-field>
                    <!-- 详情图 -->
                    <van-field name="uploader" label="详情图" required>
                        <template #input>
                            <van-uploader v-model="data.fileList" multiple :max-count="4" :after-read="onUploadList" />
                        </template>
                    </van-field>
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
        margin-top: 50px;
    }
}
</style>