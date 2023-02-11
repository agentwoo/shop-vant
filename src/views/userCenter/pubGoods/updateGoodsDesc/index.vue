<!-- 修改商品详情 -->
<script lang='ts' setup>
import { onMounted, reactive, watch } from 'vue'
import { showFailToast, showSuccessToast } from 'vant'
import router from '@/router';
import { useRoute } from 'vue-router';

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
    }
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


// 表单提交
async function onSubmit(values: any) {
    let goodsInfo = values

    let res = await updategoodsdescApi({
        goods_id: data.goods_desc.goods_id,
        goods_title: goodsInfo.goods_title,
        goods_desc: goodsInfo.goods_desc,
        goods_origin_price: goodsInfo.origin_price,
        goods_present_price: goodsInfo.present_price,
        goods_contact: goodsInfo.contact,
    })

    if (!res.ok) return showFailToast(res.message)
    showSuccessToast('修改成功！')
}


// 获取商品详情
onMounted(async () => {
    let res = await getgoodsdescApi({ goods_id: data.goods_id })
    if (!res.ok) showFailToast('系统繁忙！')
    data.goods_desc = res.data[0]
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

</script>

<template>
    <div class="container">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <div class="container_form">
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="data.goods_desc.goods_title" name="goods_title" placeholder="标题" label="标题"
                        :rules="[{ validator: validatorTitle }]" required />
                    <van-field v-model="data.goods_desc.goods_desc" name="goods_desc" placeholder="详情" label="详情"
                        :rules="[{ validator: validatorDesc }]" required />
                    <van-field v-model="data.goods_desc.goods_origin_price" name="origin_price" type="number"
                        placeholder="原价" label="原价" :rules="[{ validator: validatorOrginPrice }]" required />
                    <van-field v-model="data.goods_desc.goods_present_price" name="present_price" type="number"
                        placeholder="现价" label="现价" :rules="[{ validator: validatorOrginPrice }]" required />
                    <van-field v-model="data.goods_desc.goods_contact" name="contact" placeholder="联系方式" label="联系方式"
                        :rules="[{ validator: validatorDesc }]" required />
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