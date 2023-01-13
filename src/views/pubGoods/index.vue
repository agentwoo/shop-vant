<!-- 发布商品 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { showLoadingToast, showSuccessToast } from 'vant'
import { useGoodsItemStore, useMenusStore } from '@/store/index'
import router from '@/router';
import img from '@/assets/pig.jpeg'



import { postImgApi } from '@/http/index'
import axios from 'axios';

// 数据
const data = reactive({
    // 商品发布
    pub_goods: {
        goods_title: '',
        goods_desc: '',
        origin_price: '',
        present_price: '',
        contact: '',
    },
    // 类型选择器
    columns: useMenusStore().menus,
    result: '',
    showPicker: false,
    // 图片
    fileTitle: [],
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
const onConfirm = ({ selectedOptions }: { selectedOptions: { text: string }[] }) => {
    data.result = selectedOptions[0]?.text;
    data.showPicker = false;
};

// 上传图片
const fileList = ref([
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }
]);

// 表单提交
const onSubmit = (values: any) => {
    useGoodsItemStore().pubGoodsList.push({ ...values, imgUrl: img, order_states: '1', views: '0', goods_id: '666' })
    // useGoodsItemStore().goodsItem.unshift({ ...values, imgUrl: img, order_states: '1', views: '0', goods_id: '666' })
    router.push({ path: '/userCenter/pubGoods' })


    data.pub_goods.goods_title = '';
    data.pub_goods.goods_desc = '';
    data.pub_goods.origin_price = '';
    data.pub_goods.present_price = '';
    data.pub_goods.contact = '';
    data.result = ''
};



async function onUpload(upload_file: any) {
    // upload_file.status = 'uploading'

    const formData = new FormData()
    formData.append('file', upload_file.file)
    // const res = await postImgApi({ cover_img: formData })
    // console.log('----------', res);
    let token = localStorage.getItem('token')
    const res = await axios.post('/api/my/article/addPic', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'charset': 'utf-8',
            'Authorization': token
        }
    })
    console.log('---------', res.data);

}

</script>

<template>
    <div class="container">
        <van-nav-bar title='商品发布' fixed />
        <div class="container_form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="data.pub_goods.goods_title" name="goods_title" placeholder="标题" label="标题"
                        :rules="[{ validator: validatorTitle }]" />
                    <van-field v-model="data.pub_goods.goods_desc" name="goods_desc" placeholder="详情" label="详情"
                        :rules="[{ validator: validatorDesc }]" />
                    <van-field v-model="data.pub_goods.origin_price" name="origin_price" placeholder="原价" label="原价"
                        :rules="[{ validator: validatorOrginPrice }]" />
                    <van-field v-model="data.pub_goods.present_price" name="present_price" placeholder="现价" label="现价"
                        :rules="[{ validator: validatorOrginPrice }]" />
                    <van-field v-model="data.pub_goods.contact" name="contact" placeholder="联系方式" label="联系方式"
                        :rules="[{ validator: validatorDesc }]" />
                    <!-- 分类 -->
                    <van-field v-model="data.result" is-link readonly name="kind" label="分类" placeholder="点击选择商品分类"
                        @click="data.showPicker = true" />
                    <van-popup v-model:show="data.showPicker" position="bottom">
                        <van-picker :columns="data.columns" @confirm="onConfirm" @cancel="data.showPicker = false" />
                    </van-popup>
                    <!-- 图片 -->
                    <van-field name="uploader" label="封面图">
                        <template #input>
                            <van-uploader v-model="data.fileTitle" multiple :max-count="1" :after-read="onUpload" />
                        </template>
                    </van-field>
                    <!-- <van-field name="uploader" label="详情图">
                        <template #input>
                            <van-uploader v-model="fileList" multiple :max-count="4" />
                        </template>
                    </van-field> -->
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