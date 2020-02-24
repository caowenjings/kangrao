<template>
  <div class="merchant-ativity">
    <div class="newarticle">
      <div class="tital">新增文章</div>
      <div class="articleform">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="文章标题：" prop="name">
            <el-input v-model="form.name" placeholder="给文章起个名字"></el-input>
          </el-form-item>
          <el-form-item label="简介：" prop="desc">
            <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 5,}" placeholder="请输入文章简介" style="width:450px"></el-input>
          </el-form-item>
          <!-- :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" -->
          <el-form-item label="列表图片：" class="logo">
            <div class="uplodcont" :class="logoflage==true?'logoflage':''">
               <!-- :class="mff==true?'ff':''" -->
                  <el-upload
                    class="upload-demo"
                   
                    :data="pictureSettings"
                    :action="uploadUrl"
                    :headers="{token}"
                    :on-preview="handlePreview"
                    :before-remove="beforeRemove"
                    multiple
                    :limit="maxNum"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :on-success="successfully"
                    :on-remove="removeList"
                    :before-upload="beforeUpload"
                    :on-error="onError"
                    accept=".jpg, .jpeg, .png, .JPG, .JPEG"
                    list-type="picture-card"
                    style="height:150px;"
                  >
                    <i class="el-icon-plus"></i>
                    <p>上传</p>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                  </el-dialog>
                </div>
              <div class="el-form-item__error" v-if="logoflage">
                    请上传列表图片
              </div>
          </el-form-item>

          <el-form-item label="栏目：" prop="region">
            <el-select v-model="form.region" placeholder="请选择文章栏目">
              <el-option v-for="(item,index) in roleoptions"
                         :key="index"
              :label="item.categoryName" :value="item.id" ></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="正文：" prop="articleText">
             <div class="tinymcecont" :class="mff==true&&form.articleText==''?'tinymceconterror':''">
                <tinymce  v-model="form.articleText" @inputContent="tinymceTextLength" @onClick="onClick"></tinymce>
             </div>
            
          </el-form-item>
        </el-form>
       
      </div>
      <div class="buttom-button">
        <el-button class="button" @click.native="sumRol">{{buttext}}</el-button>
        <el-button class="cancelbtn" @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import tinymce from '../../../components/public/tinymce'
export default {
  components: {
    tinymce
  },
  data() {
    return {
      form: {
        name: "",
        desc: "",
        region: "",

        articleText:''
      },
      dialogVisible:false,
      dialogImageUrl:'',
      imgUrlList:[],
       //附件上传相关
      pictureSettings: {
        file: "",
        width: 720,
        height: 720
      },
      uploadUrl: this.axios.defaults.baseURL + "/management/common/uploadImg",
      token: null,
      maxNum:1,
      fileList:[],
      roleoptions:[],
      buttext:'',

      rules: {
          name: [
            { required: true, message: '请文章名称名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选文章栏目', trigger: ['blur', 'change'] },
            // { min: 50, max: 200, message: '长度在 50 到 100 个字符', trigger: 'blur' }
          ],

          desc: [
            { required: true, message: '请输入文章简介', trigger: 'blur' },
            { min: 50, max: 100, message: '长度在 50 到 100个字符', trigger: 'blur' }
          ],
          articleText:[
            { required: true, message: '请输入文章正文', trigger: ['blur', 'change'] }
          ]
        },
      logoflage:false,
      mff:false,
      
    };
  },
  created() {
    // this.initDate();
  },
  mounted() {
    this.queryArticleCategory();
    this.updateArticlePage();
    this.buttext=this.$route.query.id==undefined?'保存':'编辑'
    // console.log(this.$route.query.id)
  },
  methods:{
     //上传图片相关
    beforeRemove(file) {
      this.butType = false;
      if(this.$route.query.id==undefined){
      if (this.msgMsg[file.uid] == "isSize") {
        return this.$message.error(
          "上传的图片必须是等于或大于" +
            this.pictureSettings.width +
            "*" +
            this.pictureSettings.height +
            "!" +
            `已移除${file.name}!`
        );
      } else if (this.msgMsg[file.uid] == "isJPG") {
        return this.$message.error(
          "上传的图片格式应为JPG、JPEG、PNG!" + `已移除${file.name}!`
        );
      } else if (this.msgMsg[file.uid] == "isLt1M") {
        this.$message.error(
          "上传的图片大小不能超过5M!" + `已移除${file.name}!`
        );
      } else {
        return this.$confirm(`确定移除当前图片？`, "", {
          cancelButtonClass: "cancelButtonStyless"
        });
      }
      }else{
        return this.$confirm(`确定移除当前图片？`, "", {
          cancelButtonClass: "cancelButtonStyless"
        });
      }
    },

    handleExceed() {
      // files, fileList
      this.$message.warning(`当前限制选择 ${this.maxNum} 个文件!`);
    },
    //上传成功返回
    successfully(response, file, fileList) {
      let imgUrlListArr = [];
      fileList.map(v => {
        if (v.response) {
          if (v.response.object) {
            imgUrlListArr.push({
              response: v.response.object,
              sequence: 0,
              id: 0
            });
          } else {
            imgUrlListArr.push({
              response: v.response,
              sequence: v.sequence,
              id: v.id
            });
          }
        }
      });
      if (imgUrlListArr.indexOf(undefined) == -1) {
        let sequenceRrr = imgUrlListArr.map(v => (v.sequence ? v.sequence : 0));
        var max =
          sequenceRrr.length > 0 ? Math.max.apply(null, sequenceRrr) : 0;
        imgUrlListArr = imgUrlListArr.map((v, i) => {
          if (v.sequence == 0) {
            return { sequence: max + 1 + i, response: v.response, id: v.id };
          } else {
            return v;
          }
        });
        this.imgUrlList = imgUrlListArr.map(v => {
          return {
            compressedFilePath: v.response.compressedFilePath,
            originalFilePath: v.response.originalFilePath
          };
        });
        console.log(1302, this.imgUrlList);
         this.logoflage=false;
        this.butTypeFn();
      }
      this.logoflage=false;
    },
    //  //上传按钮状态
    butTypeFn() {
      if (this.imgUrlList.indexOf(undefined) == -1) {
        this.butType = false;
      } else {
        this.butType = true;
      }
    },
    //删除图片
    removeList(file, fileList) {
      // this.mff=true;
      let imgUrlListArr = [];
      if (fileList.length > 0) {
        fileList.map(v => {
          //   console.log(1322,v)
          imgUrlListArr.push({
            compressedFilePath: v.response.object.compressedFilePath,
            originalFilePath: v.response.object.originalFilePath
          });
        });
      }
      this.imgUrlList = imgUrlListArr;
      //   console.log(1326,this.imgUrlList)
    },
    //图片上传前
    beforeUpload(file) {
      this.butType = true;
      this.pictureSettings.file = { ...file, file };
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 5;
      if (!isJPG) {
        this.msgMsg = { ...this.msgMsg, [file.uid]: "isJPG" };
        return isJPG;
      }
      if (!isLt1M) {
        this.msgMsg = { ...this.msgMsg, [file.uid]: "isLt1M" };
        return isLt1M;
      }
      const isSize = new Promise(function(resolve, reject) {
        // let width = 720;
        // let height = 720;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = true;
          // console.log(1428,img.width,img.height);
          // if(img.width<820){
          //   valid=true;
          // }
          // if (img.width - img.height > 0) {
          //   valid = img.width >= width && img.height >= height;
          // } else {
          //   valid = img.width >= height && img.height >= width;
          // }
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.msgMsg = { ...this.msgMsg, [file.uid]: "isSize" };
          return Promise.reject();
        }
      );
      this.msgMsg = { ...this.msgMsg, [file.uid]: "" };
      return isSize;
    },
    //图片上传失败
    onError() {
      this.$message.error("图片上传失败!");
    },
    //放大图片
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible2 = true;
    },
    //取消
    cancel(){
      this.$router.history.go(-1)
    },
    // 查询文章分类栏目
    queryArticleCategory(){
      this.axios.get("management/common/queryArticleCategory")
          .then(resp=>{
            // console.log(127,resp.data.object);
            this.roleoptions=resp.data.object;
          })
    },
    //编辑回显
    updateArticlePage(){
      if(this.$route.query.id==undefined){
        return;
      }
      this.axios.get("management/article/updateArticlePage?id="+this.$route.query.id)
          .then(resp=>{
            console.log(265,resp.data.object);
            this.form.name=resp.data.object.articleTitle;
            this.form.desc=resp.data.object.introduction;
            this.form.articleText=resp.data.object.articleText;
            this.form.region=resp.data.object.categoryId;
            this.fileList=[{url:resp.data.object.compressedFilePath}];
            this.imgUrlList=[{'originalFilePath':null,'compressedFilePath':resp.data.object.compressedFilePath,}]
          })
    },
    //发布
    sumRol(){
      // this.mff=true;
      // this.rules= {
      //     name: [
      //       { required: true, message: '请文章名称名称', trigger: 'blur' },
      //       { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
      //     ],
      //     region: [
      //       { required: true, message: '请选文章栏目', trigger: ['blur', 'change'] }
      //     ],

      //     desc: [
      //       { required: true, message: '请输入文章简介', trigger: 'blur' }
      //     ],
      //     articleText:[
      //       { required: true, message: '请输入文章正文', trigger: ['blur', 'change'] }
      //     ]
      //   }
        console.log(342,'aaa')
      this.$refs.form.validate((valid) => {
        
          if (valid) {
            if(this.imgUrlList.length==0){
              this.logoflage=true;
              return false;
            }
            let id=this.$route.query.id;

            let posturl=id==undefined?'management/article/addArticle':'management/article/updateArticle';
            this.axios.post(posturl,{
              id:id==undefined?null:Number(id),
              articleTitle:this.form.name,
              introduction:this.form.desc,
              compressedFilePath:this.imgUrlList[0].compressedFilePath,
              categoryId:this.form.region,
              articleText:this.form.articleText
            }).then(resp=>{
              if (resp.data.success) {
                  this.$message({
                    message: resp.data.msg,
                    type: "success",
                    center: true,
                    duration: 1500
                  });
                this.$router.history.go(-1)
                } else {
                  this.$message({
                    message: resp.data.msg,
                    type: "error",
                    center: true,
                    duration: 1500
                  });

                }
            })
            return true;
          } else {
            if(this.imgUrlList.length==0){
              this.logoflage=true;
              return false;
            }
            return false;
          }
      });
       this.mff=true;
      this.rules= {
          name: [
            { required: true, message: '请文章名称名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选文章栏目', trigger: ['blur', 'change'] }
          ],

          desc: [
            { required: true, message: '请输入文章简介', trigger: 'blur' },
            { min: 50, max: 100, message: '长度在 50 到 100个字符', trigger: 'blur' }
          ],
          articleText:[
            { required: true, message: '请输入文章正文', trigger: ['blur', 'change'] }
          ]
        }
    },
    //
    tinymceTextLength (e) {
      this.tinymceChatLength = e;
    },
    onClick(){
      this.mff=false;
      this.rules= {
          name: [
            { required: true, message: '请文章名称名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选文章栏目', trigger: ['blur', 'change'] }
          ],

          desc: [
            { required: true, message: '请输入文章简介', trigger: 'blur' },
            { min: 50, max: 100, message: '长度在 50 到 100个字符', trigger: 'blur' }
          ],
          articleText:[
            { required: true, message: ' ', trigger: ['blur', 'change'] }
          ]
        }
    }
  }
};
</script>

<style lang="less">
.logo .el-form-item__label:before{
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
    display: inline-block;
}
.newarticle {
    .el-upload-list--picture-card .el-upload-list__item-actions:hover span:first-child {
      display: none;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions span+span{
    margin-left: 0px;
  }
  .tital {
    color: #2477f6;
    border-left: 4px solid #2477f6;
    height: 14px;
    font-size: 14px;
    line-height: 14px;
    padding-left: 8px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .articleform {
    width: 915px;
    border-bottom: 1px solid #D3D7E2;
    .el-form-item__label{
        width: 94px !important;
    }
    .el-input__icon{
        line-height: 36px;
    }
    .el-input{
        width: 323px;
        height: 36px;
        .el-input__inner{
            height: 36px;
            line-height: 36px;
        }
    }
    .el-form-item__content{
        margin-left: 94px!important;
    }
    .uplodcont{
        width:145px;
        height:145px;
        border:1px dashed rgba(211,215,226,1);
        border-radius:4px;
        overflow: hidden;
         .upload-demo{
           padding-top: 0.1px;
           box-sizing: border-box;
         }
        .el-upload--picture-card{
            width:113px;
            height:113px;
            background:rgba(241,244,251,1);
            border-radius:4px;
            border: none;
          
            margin-top: 15px;
            margin-left: 15px;
            line-height: 113px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p{
               height: 20px;
               line-height: 20px;
               color: #999;
            }
        }
        
      
    }
    .logoflage{
      border-color: #F56C6C
    }
    .tinymcecont{
      border: 1px solid #ccc;
      border-radius: 4px;
      overflow: hidden;
      width: 819px;
        .tox-tinymce{
          border:none
        }
    }
    .tinymceconterror{
       border-color: #F56C6C
    }
  }
  .buttom-button{
      margin-top: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
  }
}
</style>
