<template>
  <div>
    <!--<el-upload-->
    <!--class="upload-demo"-->
    <!--action="string"-->
    <!--list-type="picture-card"-->
    <!--:http-request = "uploadFile"-->
    <!--:on-remove="handleRemove"-->
    <!--:before-remove="beforeRemove"-->
    <!--:before-upload='beforeUploadDDD'-->
    <!--multiple-->
    <!--:limit="100"-->
    <!--:on-exceed="handleExceed"-->
    <!--:file-list="fileList">-->
    <!--<el-button size="small" type="primary">点击上传</el-button>-->
    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
    <!--</el-upload>-->
    <div class="addteacher-img">
      <!--   :on-success='successfully'   <span>*</span> -->
      <div class="label">上传图片：</div>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :data="pictureSettings"
        :on-success="successfully"
        :before-upload="beforeUpload"
        :on-error="onError"
        :action="doUpload"
        accept=".jpg, .jpeg, .png, .bmp, .JPG, .JPEG, BMP"
        ref="uploadAdd"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div v-if="imageUrl" class="deleteicon">
        <i class="iconfont icon-shanchu" @click="deleteimg"></i>
      </div>
    </div>
    <div class="hint" style="color: #838CA0">
      <!--建议上传690 * 330比例的图片-->
      <span>*</span> 必须上传690*330像素，不超过出5M，格式为JPG\PNG\BMP\JPEG
    </div>
  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        imageUrl: "",
        // doUpload: this.axios.defaults.baseURL,
        doUpload:
        this.axios.defaults.baseURL + "/platform/systemManagement/uploadImg",
        // uploadUrl:this.axios.defaults.baseURL+'/platform/systemManagement/uploadImg',
        dialogVisible: false,
        dialogImageUrl: ""
      };
    },
    methods: {
      uploadFile(file, fileList) {
        console.log(file.file, fileList, "upload");
        this.$upload(file.file, this.handlePictureCardPreview);
      },
      beforeUploadDDD(file, fileList) {
        console.log(file, fileList);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file, "+++++++");
      },
      successfully(file) {
        console.log(file, "-------");
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
      },
      // beforeRemove(file, fileList) {
      //   return this.$confirm(`确定移除 ${ file.name }？`);
      // },
      beforeRemove(file) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.path;
        this.dialogVisible = true;
      }
    }
  };
</script>

<style scoped>
</style>
