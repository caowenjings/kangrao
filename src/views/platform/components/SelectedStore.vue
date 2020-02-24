<template>
  <div class="SelectedStore">
    <div class="SelectedStore_center">
      <div class="SelectedStore_tab">
        <span @click="jumpTab(1)" v-if="banner">Banner推广</span>
        <span class="active" v-if="store">精选商户</span>
        <span @click="jumpTab(3)" v-if="activity">活动推荐</span>
      </div>
      <div class="merchant-ativity">
        <div class="merchant-ativity-content">
          <div class="teachform-center">
            <div class="left-cont">
              <div class="header-button">
                <button class="button" v-if="AddField" @click="addPicture(1)">+ 添加精选商户</button>
              </div>

              <el-dialog :visible.sync="arrowshow" width="650px" title="添加精选商户">
                <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                  <el-form-item label="跳转商户:">
                    <el-autocomplete
                      class="inline-input"
                      v-model="form.name"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入商户名称"
                      :trigger-on-focus="false"
                      @select="handleSelect"
                      @input="selectStoreByName"
                      :disabled="type==2||tyde==true"
                    ></el-autocomplete>
                    <!-- <el-input v-model="form.name" placeholder="请输入商户名称"></el-input> -->
                  </el-form-item>

                  <el-form-item v-if="restaurantsflage">
                    <p style="width:200px;text-align:center">无数据匹配</p>
                  </el-form-item>

                  <el-form-item label="商户名称:" v-show="storeId!=null" prop="rendname">
                    <el-input v-model="form.rendname" placeholder="请输入商户名称"></el-input>
                  </el-form-item>
                  <!-- :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove"-->

                  <el-form-item label="LOGO:" v-show="storeId!=null" class="logo">
                    <div class="uplodcont" :class="logoflage==true?'logoflage':''">
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
                      <!-- <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                      </el-dialog> -->
                    </div>

                    <!-- <span class="morespan">重新上传</span> -->
                    <div class="el-form-item__error" v-if="logoflage">请上传商户logo</div>
                  </el-form-item>

                  <el-form-item label="商户简介:" v-show="storeId!=null" prop="desc">
                    <el-input
                      type="textarea"
                      v-model="form.desc"
                      :autosize="{ minRows: 3, maxRows: 5}"
                      placeholder="请输入商户简介"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="商户亮点:" v-show="storeId!=null" prop="feature" class="logo1">
                    <div class="butcon" v-for="(item,index) in featurearr" :key="index">
                      <p class="afaddbutton">{{item}}</p>
                      <div class="circal" @click="delfeature(index)">—</div>
                    </div>

                    <el-input
                      class="addbutton"
                      v-model="form.feature"
                      :placeholder="placeholdertext"
                      @focus="placeholdertextchange"
                      @blur="changefeaturearr"
                      :class="featureflage?'featurefalse':''"
                    ></el-input>
                    <div class="el-form-item__error" v-if="featureflage">请输入商户亮点</div>
                  </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer" v-show="storeId!=null">
                  <!-- @click="selectvalue"@click="delvalue" -->
                  <el-button
                    type="primary"
                    size="small"
                    class="button"
                    @click.native="addAdvertStore"
                  >确 定</el-button>
                  <el-button size="small" class="cancelbtn"  @click.native="arrowshow=false" style="padding: 0 20px !important;">取 消</el-button>
                </span>
              </el-dialog>

              <div class="eltabel">
                <!--  -->
                <el-table
                  :data="activeList"
                  style="width:80%;min-width:600px"
                  border
                  :header-cell-style="tableStyleObj"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column prop="storeName" label="商户名称"></el-table-column>
                  <el-table-column prop="storeDesc" label="商户介绍" :formatter="formatcourseNum"></el-table-column>
                  <el-table-column prop="features" label="商户亮点" :formatter="formatcoursEnd"></el-table-column>

                  <el-table-column prop="gmtModified" label="修改时间" width="190"></el-table-column>
                  <el-table-column prop="userName" label="修改人"></el-table-column>
                  <el-table-column label="操作" width="250">
                    <template slot-scope="scope">
                      <el-button @click="toTopEdit(scope.row)" v-if="TopField" type="text">
                        <span v-if="scope.row.isTop">取消置顶</span>
                        <span v-else>置顶</span>
                      </el-button>
                      <el-button
                        type="text"
                        v-if="EditField"
                        @click="modificationApplyName(scope.row,2)"
                      >修改</el-button>
                      <!-- -->
                      <el-button type="text" v-if="CancelField" @click="deleterole(scope.row.id)">删除</el-button>
                      <!-- @click="modificationOut(scope.row)" -->
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 分页-->
                <!-- <div class="Toolbar" v-show="total !=0">
                <el-pagination
                  background
                  @size-change="SizeChange"
                  @current-change="CurrentChange"
                  :current-page.sync="currentPage"
                  :page-sizes="[10,20,50]"
                  layout="total,sizes,prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
                </div>-->
              </div>
            </div>
          </div>
        </div>
        <!-- 删除-->
        <selfModal ref="deleteSelect" :styleObj="styleObj">
          <div class="delete-content" @click.prevent.stop>
            <div class="top">
              <i class="iconfont icon-icon-test6"></i>
              <span class="t-title">删除精选商户</span>
            </div>
            <div class="select1">
              <el-form>
                <div class="infor-item">
                  <p class="d-c-tips">删除后将不再显示在小程序首页</p>
                  <p class="d-c-tips1">你还要继续么？</p>
                </div>
                <div class="but-button">
                  <el-button class="button" @click.native="modificationOut">确定</el-button>
                  <el-button class="cancelbtn" @click.native="closedelete">取消</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </selfModal>
      </div>
    </div>
  </div>
</template>
<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    return {
      activeList: [],
      arrowshow: false,
      dialogVisible: false,
      dialogImageUrl: "",
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      },
      form: {
        name: "",
        rendname: "",

        desc: "",
        feature: ""
      },
      featurearr: [],
      placeholdertext: "+添加商户亮点",
      restaurants: [],
      storeId: null,
      //附件上传相关
      pictureSettings: {
        file: "",
        width: 720,
        height: 720
      },
      maxNum: 1,
      uploadUrl: this.axios.defaults.baseURL + "/management/common/uploadImg",
      token: null,
      fileList: [],
      imgUrlList: [],
      featureflage: false,
      logoflage: false,
      rules: {
        rendname: [
          { required: true, message: "请输入活动名称", trigger: "change" },
          {
            min: 2,
            max: 20,
            message: "长度在 3 到 5 个字符",
            trigger: "change"
          }
        ],
        desc: [
          { required: true, message: "请输入商户简介", trigger: "change" },
          {
            min: 1,
            max: 500,
            message: "长度在 1 到 500 个字符",
            trigger: "change"
          }
        ]
      },
      delid: null,
      type: null, //1添加，2修改，
      tyde:false,
      restaurantsflage: false,
      listid:null,
    };
  },
  computed: {
    // 添加精选商户
    AddField() {
      return this.publicjs.hasId("mg:market:home:store:add");
    },
    // 置顶
    TopField() {
      return this.publicjs.hasId("mg:market:home:store:top");
    },
    EditField() {
      return this.publicjs.hasId("mg:market:home:store:update");
    },
    CancelField() {
      return this.publicjs.hasId("mg:market:home:store:delete");
    },
    banner() {
      return this.publicjs.hasId("mg:market:home:bannerall");
    },
    store() {
      return this.publicjs.hasId("mg:market:home:storeall");
    },
    activity() {
      return this.publicjs.hasId("mg:market:home:activityall");
    }
  },
  components: {
    selfModal
  },
  mounted() {
    this.getDate();
  },
  methods: {
    // tab跳转
    jumpTab(s) {
      switch (s) {
        case 1:
          this.$router.push({ path: "/platform/banner" });
          break;
        case 3:
          this.$router.push({ path: "/platform/ActivityRecommendation" });
          break;
      }
    },
    //添加商户亮点
    placeholdertextchange() {
      // this.featureflage=false;
      this.placeholdertext = "";
    },
    // 弹框搜索
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    //商户亮点
    changefeaturearr() {
      // console.log(216,this.form.feature);
      this.featureflage = false;
      if (this.form.feature != "") {
        this.featurearr.push(this.form.feature);
      }
      this.form.feature = "";
      this.placeholdertext = "+添加商户亮点";
      // console.log(this.featurearr)
    },
    //删除商户亮点
    delfeature(index) {
      this.featurearr.splice(index, 1);
      console.log(this.featurearr);
    },
    //搜索
    selectStoreByName() {
      this.axios
        .get("management/homeadvertstore/selectStoreByName", {
          params: {
            storeName: this.form.name
          }
        })
        .then(resp => {
          resp.data.object.forEach(curr => {
            curr.value = curr.storeName;
          });
          this.restaurants = resp.data.object;
          if (this.restaurants.length > 0) {
            this.restaurantsflage = false;
          } else {
            this.restaurantsflage = true;
          }
        });
    },
    //点击选择商户
    handleSelect(item) {
      this.storeId = item.id;
      this.$refs["form"].resetFields();
      this.featureflage = false;
      this.logoflage = false;
      this.tyde=true;
      this.form.rendname = item.storeName;
    },
    //点击创建
    addPicture(type) {
      this.type = type;
      this.listid=null;
      this.tyde=false;
      this.storeId = null;
    
      this.imgUrlList = [];
      this.form.desc = "";
      this.featurearr = [];
      this.form.name = "";
      this.form.rendname = "";
      this.fileList = [];

      this.arrowshow = true;
    },
    //获取列表
    getDate() {
      this.axios
        .get("/management/homeadvertstore/selectAdvertStoreList")
        .then(resp => {
          this.activeList = resp.data.object;
        });
    },
    //表头样式
    tableStyleObj({ rowIndex, columnIndex }) {
      if (rowIndex === columnIndex) {
        return {
          background: "#F5F5F5",
          color: "#28282F"
        };
      }
      return {
        background: "#F5F5F5",
        color: "#28282F",
        "text-align": "left"
      };
    },
    //处理缺省
    formatcourseNum: function(row) {
      if (row.storeDesc == "") {
        return "--";
      } else {
        return row.storeDesc;
      }
    },
    formatcoursEnd: function(row) {
      if (row.features == "") {
        return "--";
      } else {
        return row.features;
      }
    },
    //处理置顶不指定的样式
    tableRowClassName({ row }) {
      if (row.isTop === 1) {
        return "success-row";
      }
      return "";
    },
    // 添加精选商户
    addAdvertStore() {
      let posturl =
      this.type == 1
          ? "/management/homeadvertstore/addAdvertStore"
          : "/management/homeadvertstore/updateAdvertStore";
      
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log(436,valid)
          return true;
        } else {
          return false;
        }
      });
      
      if (this.featurearr.length == 0 && this.imgUrlList.length == 0) {
        this.featureflage = true;
        this.logoflage = true;
        return false;
      }
      if (this.featurearr.length == 0 && this.imgUrlList.length != 0) {
        this.featureflage = true;
        this.logoflage = false;
        return false;
      }
      if (this.featurearr.length != 0 && this.imgUrlList.length == 0) {
        this.featureflage = false;
        this.logoflage = true;
        return false;
      }

     if(this.form.desc==""||this.form.desc==null){
       return false;
     }

      this.axios
        .post(posturl, {
          storeId: this.storeId,
          originalFilePath:
            this.type == 1 ? this.imgUrlList[0].originalFilePath : null,
          editFilePath: this.imgUrlList[0].compressedFilePath,
          storeDesc: this.form.desc,
          features: this.featurearr.toString(),
          storeName: this.form.rendname,
          id:this.listid
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              message: resp.data.msg,
              type: "success",
              center: true,
              duration: 800
            });
            this.arrowshow = false;
            this.imgUrlList = [];
            this.form.desc = "";
            this.featurearr = [];
            this.form.rendname = "";
            this.fileList = [];
            this.$refs["form"].resetFields();
            this.getDate();
          } else {
            this.$message({
              message: resp.data.msg,
              type: "error",
              center: true,
              duration: 800
            });
            this.arrowshow = false;
            // this.$refs.decomeSelect.showModal = false;
          }
        });
    },
    // 置顶
    toTopEdit(item) {
      this.axios
        .post("/management/homeadvertstore/setIsTop", {
          id: item.id,
          isTop: item.isTop
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              message: resp.data.msg,
              type: "success",
              center: true,
              duration: 800
            });
            this.getDate();
          } else {
            this.$message({
              message: resp.data.msg,
              type: "error",
              center: true,
              duration: 800
            });
            // this.$refs.decomeSelect.showModal = false;
          }
        });
    },
    deleterole(id) {
      this.delid = id;
      this.$refs.deleteSelect.showModal = true;
    },
    closedelete() {
      this.$refs.deleteSelect.showModal = false;
    },
    //删除
    modificationOut() {
      console.log(286, this.delid);
      this.axios
        .post("/management/homeadvertstore/deleteAdvertStore", {
          id: this.delid
        })
        .then(resp => {
          console.log(295, resp);
          if (resp.data.success) {
            this.$message({
              message: resp.data.msg,
              type: "success",
              center: true,
              duration: 800
            });
            this.$refs.deleteSelect.showModal = false;
            this.getDate();
          } else {
            this.$message({
              message: resp.data.msg,
              type: "error",
              center: true,
              duration: 800
            });
            this.$refs.deleteSelect.showModal = false;
          }
        });
    },
    //修改
    modificationApplyName(item, type) {
      console.log(486, item);
      this.type = type;
      this.storeId = item.storeId;
      this.listid=item.id;
      this.arrowshow = true;
      this.form.name = item.storeName;
      this.form.rendname = item.storeName;
      this.form.desc = item.storeDesc;
      this.featureflage = false;
      this.logoflage = false;
      this.featurearr = item.features.split(",");
      this.fileList = [{ url: item.logo }];
      this.imgUrlList = [
        { originalFilePath: null, compressedFilePath: item.logo }
      ];
      // this.form.feature=item.features;
    },

    //   修改
    handleEdit(index, row) {
      this.$router.push({
        path: "/addpackage",
        query: { num_id: JSON.stringify(row) }
      });
    },

    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // //分页
    // CurrentChange(val) {
    //   console.log(val);
    //   this.page = val;
    //   const [statrTime, endTime] = this.statrtime || [null, null];
    //   this.getDateScroll(statrTime, endTime, this.course);
    // },
    // SizeChange(val) {
    //   this.currentPage = 1;
    //   this.page = 1;
    //   this.rows = val;
    //   this.getDateScroll();
    // },

    //上传图片相关
    beforeRemove(file) {
      console.log(544, file);
      this.butType = false;
      if (this.type == 1) {
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
      } else {
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
        this.butTypeFn();
      }
      this.logoflage = false;
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
      this.dialogVisible= true;
    }
  },
  filters: {
    fa: function(i) {
      return i;
    }
  },
  created() {}
};
</script>

<style lang='less'>
.SelectedStore {
  display: flex;
  flex-direction: column;
  // .SelectedStore_top {
  //   height: 60px;
  //   width: 100%;
  //   display: flex;
  //   align-items: center;
  //   font-size: 16px;
  //   box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);
  //   border-radius: 4px;
  //   padding: 0;
  //   margin-bottom: 20px;
  //   .b_t_title1 {
  //     height: 60px;
  //     line-height: 60px;
  //     width: 150px;
  //     background: rgba(248, 248, 248, 1);
  //     border-radius: 4px;
  //     color: rgba(51, 51, 51, 1);
  //     text-align: center;
  //   }
  //   .b_t_title2 {
  //     line-height: 60px;
  //     color: #2477f6;
  //     height: 60px;
  //     margin-left: 20px;
  //   }
  // }
  .SelectedStore_center {
    box-sizing: border-box;
    box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);
    flex: 1;
    border-radius: 4px;
    box-sizing: border-box;
    .SelectedStore_tab {
      span {
        font-size: 16px;
        font-weight: 400;
        color: rgba(28, 36, 65, 1);
        margin-right: 30px;
        display: inline-block;
        padding-bottom: 4px;
        cursor: pointer;
      }
      .active {
        color: rgba(36, 119, 246, 1);
        border-bottom: 2px solid rgba(36, 119, 246, 1);
      }
    }
  }
}
</style>

<style lang="less">

.logo .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
  display: inline-block;
}
.logo1 .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
  display: inline-block;
}
.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  left: 0;
}

.merchant-ativity {
  box-sizing: border-box;
  margin-top: 15px;
  .el-form-item__label {
  width: 83px !important;
  }
  .el-form-item__content {
    margin-left: 83px !important;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions:hover span:first-child {
      display: none;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions span+span{
    margin-left: 0px;
  }
  .el-dialog__headerbtn .el-dialog__close{
    color:#D3D7E2;
  }
  .el-upload-list__item {
      transition: none !important;
  }
  .merchant-ativity-content {
    min-width: 1200px;
    .title-ativity {
      height: 52px;
      .c-c-top-item {
        margin-right: 30px;
      }
      .button {
        display: inline-block;
        height: 40px;
      }
      .coursebooking-content-top {
      }
      // 搜索
      .searchtext {
        width: 253px;
        .el-input__inner {
          border-radius: 4px;
        }
        .searchinput {
          float: left;
        }
        .search:hover {
          background-color: #2477f6 !important;
          border: none !important;
        }
        margin-left: 15px;
      }
      .search {
        display: inline-block;
        text-align: center;
        float: right;
        height: 36px;
        padding: 0 20px;
        background-color: #5092f8;
        border-radius: 4px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
      }
    }

    .teachform-center {
      // 搜索
      .coursebtn {
        overflow: hidden;
        .coursebtn-left {
          float: left;
          margin-right: 40px;
        }
        .el-input__inner {
          border-radius: 0px;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .searchtext {
          float: left;
          margin-bottom: 20px;
          .inputsearch {
            width: 168px;
            float: left;
          }
          .search {
            float: left;
            height: 40px;
            width: 40px;
            background-color: #5092f8;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            i {
              font-size: 30px;
              color: #fff;
            }
          }
        }
      }
      .left-cont {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        .header-button {
          width: 100%;
          height: auto;
          overflow: hidden;
        }
        .eltabel {
          margin-top: 20px;
          /*overflow-y: auto;*/

          button {
            background: none !important;
            width: 56px;
          }
          .el-table__body-wrapper {
            /*overflow: visible	!important;*/
          }
        }
      }
    }
  }
  .styleName {
    width: 500px !important;
    background-color: #00cc99;
  }
  .el-table .success-row {
    background: #fdf3f4;
  }
  .el-dialog {
    min-height: 600px;

    .uplodcont {
      width: 145px;
      height: 145px;
      border: 1px dashed rgba(211, 215, 226, 1);
      border-radius: 4px;
      overflow: hidden;
      float: left;
      .upload-demo {
        padding-top: 0.1px;
        box-sizing: border-box;
      }
      .el-upload--picture-card {
        width: 113px;
        height: 113px;
        background: rgba(241, 244, 251, 1);
        border-radius: 4px;
        border: none;
        margin-top: 15px;
        margin-left: 15px;
        line-height: 113px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        p {
          height: 20px;
          line-height: 20px;
          color: #999;
        }
      }
    }
    .logoflage {
      border-color: #f56c6c;
    }
    .morespan {
      font-size: 14px;
      color: #2477f6;
      margin-left: 10px;
      float: left;
      margin-bottom: 0px;
      display: inline-block;
      height: 145px;
      line-height: 275px;
      cursor: pointer;
    }
    width: 460px !important;
    // max-height: 600px;
    // overflow-y: auto;
    .el-input {
      width: 244px;
    }
    .el-form-item {
      margin-bottom: 18px;
    }
    .butcon {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    .el-input__inner {
      height: 36px;
      line-height: 36px;
    }
    .addbutton {
      width: 244px;
      // border: 1px solid;

      color: #2477f6;
      height: 40px;

      border-radius: 4px;
      cursor: pointer;
      //   float: left;

      .el-input__inner {
        border-color: #2477f6;
      }
      input::-webkit-input-placeholder {
        color: #2477f6;
        text-align: center;
      }
      input::-moz-input-placeholder {
        color: #2477f6;
        text-align: center;
      }
      input::-ms-input-placeholder {
        color: #2477f6;
        text-align: center;
      }
    }
    .featurefalse {
      color: #f56c6c;
      .el-input__inner {
        border-color: #f56c6c;
      }
      input::-webkit-input-placeholder {
        color: #f56c6c;
        text-align: center;
      }
      input::-moz-input-placeholder {
        color: #f56c6c;
        text-align: center;
      }
      input::-ms-input-placeholder {
        color: #f56c6c;
        text-align: center;
      }
    }
    .circal {
      width: 19px;
      height: 19px;
      border-radius: 50%;
      border: 2px solid #d3d7e2;
      color: #d3d7e2;
      font-weight: 1000;
      text-align: center;
      line-height: 19px;
      //    float: left;
      margin-left: 10px;
      cursor: pointer;
    }
    .circal:hover {
      color: #2477f6;
      border-color: #2477f6;
    }
    .afaddbutton {
      width: 244px;
      border: 1px solid;
      border-color: #d3d7e2;
      color: #999;
      height: 36px;
      // text-align: center;
      border-radius: 4px;
      line-height: 36px;
      padding-left: 13px;
      box-sizing: border-box;
    }
  }
  .el-dialog__header {
    padding: 20px 39px;
    // padding-bottom: 0;
    box-sizing: border-box;
    border-bottom: 1px solid #d3d7e2;
  }
  .el-dialog__headerbtn {
    font-size: 25px;
    color: #d3d7e2;
  }
  .el-dialog__title {
    font-size: 18px;
    color: #333;
  }
  .el-dialog__body {
    padding: 23px 30px;
    padding-right: 39px;
    box-sizing: border-box;
    padding-bottom: 0;
  }
  .el-dialog__footer {
    padding-top: 0;
  }
  //   删除弹框
  .delete-content {
    // min-width: 500px;
    width: 332px;
    height: 179px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    padding: 0 35px;
    box-sizing: border-box;
    .top {
      margin-top: 15px;
      display: flex;
      i {
        font-size: 30px;
        color: #ff1200;
      }
      .t-title {
        font-size: 16px;
        font-weight: 500;
        color: #666;
        margin-left: 10px;
        margin-top: 8px;
      }
    }
    .d-c-tips {
      font-size: 14px;
      color: #888888;
    }
    .d-c-tips1 {
      font-size: 14px;
      color: #888888;
      margin-top: 12px;
      margin-bottom: 15px;
    }
    .el-form-item__label {
      color: #888888;
    }
    .el-textarea__inner {
      height: 120px;
      width: 300px;
    }
    .select1 {
      margin-left: 40px;
    }
    .but-button {
      margin-right: 45px;
      float: right;
      text-align: center;
      display: flex;
      // margin: auto;
    }
  }
}
</style>

