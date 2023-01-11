<!-- 发布商品 -->
<script lang='ts' setup>
import { reactive, toRefs, ref } from 'vue'
import { closeToast, showLoadingToast } from 'vant';

const value1 = ref('');
const value2 = ref('');

const result = ref('');
const showPicker = ref(false);
const columns = [
    { text: '学习用品', value: 'xuexiyongpin' },
    { text: '生活用品', value: 'shenghouyongpin' },
    { text: '衣服鞋帽', value: 'yifuxiemao' },
    { text: '运动健身', value: 'yundongjiansheng' },
    { text: '电子产品', value: 'dianzichanpin' },
    { text: '零食饮料', value: 'lingshiyinliao' },
    { text: '其它', value: 'qita' },
];


const onConfirm = () => {

};

const value = ref([
    // { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
]);
const fileList = ref([
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' },
    { url: 'https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg' }
]);

const onFailed = (errorInfo: any) => {
    console.log('failed', errorInfo);
};


</script>

<template>
    <div class="container">
        <van-nav-bar title='商品发布' fixed />
        <div class="container_form">
            <van-form @failed="onFailed">
                <van-cell-group inset>
                    <!-- 通过 validator 进行函数校验 -->
                    <van-field v-model="value1" name="validator" placeholder="函数校验" label="标题"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <!-- 通过 validator 返回错误提示 -->
                    <van-field v-model="value2" name="validatorMessage" placeholder="校验函数返回错误提示" label="详情"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field v-model="value2" name="validatorMessage" placeholder="校验函数返回错误提示" label="原价"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field v-model="value2" name="validatorMessage" placeholder="校验函数返回错误提示" label="现价"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <van-field v-model="value2" name="validatorMessage" placeholder="校验函数返回错误提示" label="联系方式"
                        :rules="[{ required: true, message: '请填写密码' }]" />
                    <!-- 分类 -->
                    <van-field v-model="result" is-link readonly name="picker" label="分类" placeholder="点击选择商品分类"
                        @click="showPicker = true" />
                    <van-popup v-model:show="showPicker" position="bottom">
                        <van-picker :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                    </van-popup>
                    <!-- 图片 -->
                    <van-field name="uploader" label="封面图">
                        <template #input>
                            <van-uploader v-model="value" multiple :max-count="1" />
                        </template>
                    </van-field>
                    <van-field name="uploader" label="详情图">
                        <template #input>
                            <van-uploader v-model="fileList" multiple :max-count="4" />
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