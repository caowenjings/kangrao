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
    <el-upload
      action="string"
      list-type="picture-card"
      :http-request="uploadFile"
      :before-remove="beforeRemove"
      :before-upload="beforeUploadDDD"
      :on-preview="handlePictureCardPreview"
      :on-success="successfully"
      :on-remove="handleRemove"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
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
