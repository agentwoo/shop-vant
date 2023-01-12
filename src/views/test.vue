<script>
// import { uploadFiles, deleteFiles } from "../../api/enforcement"; //引入上传、删除接口
export default {
    data() {
        return {
            fileList: [], //上传的文件列表
            clzpfilePath: "", //删除所需参数
        };
    },
    methods: {
        //校验上传图片大小
        onOversize(file) {
            console.log(file);
            this.$toast("文件大小不能超过5MB");
        },
        //校验图片的格式
        beforeRead(file) {
            if (!/(jpg|jpeg|png|JPG|PNG)/i.test(file.type)) {
                this.$toast("请上传正确格式的图片");
                return false;
            }
            return true;
        },
        //照片上传事件方法
        clzpAfterRead(file) {
            // 上传状态提示开启
            file.status = "uploading";
            file.message = "上传中...";
            // 创建一个空对象实例
            let formData = new FormData();
            // 调用append()方法添加数据
            formData.append("file", file.file);
            // uploadFiles(formData).then((res) => {
            //     if (res.code == "10000") {
            //         // 上传状态提示关闭
            //         file.status = "done";
            //         this.$toast("上传成功！");
            //         this.clzpfilePath = res.data.relativePath; //删除所需参数
            //     }
            // });
        },
        //照片删除事件方法
        deleteClzp() {
            // filePath：删除所需的参数
            // deleteFiles({ filePath: this.clzpfilePath }).then((res) => {
            //     if (res.code == "10000") {
            //         this.$toast("删除成功！");
            //     }
            // });
        },
    },
};
</script>


<template>
    <div>
        <!--// 上传组件 //-->
        <van-uploader @oversize="onOversize" @delete="deleteClzp" :before-read="beforeRead" :after-read="clzpAfterRead"
            v-model="fileList" :max-count="1" :max-size="5 * 1024 * 1024" />
    </div>
</template>

