<template>
  <div class="ActivityRecommendation">
    <div class="ActivityRecommendation_center">
      <!-- tab切换 -->
      <div class="ActivityRecommendation_tab">
        <span @click="jumpTab(1)" v-if="banner">Banner推广</span>
        <span @click="jumpTab(2)" v-if="store">精选商户</span>
        <span class="active" @click="jumpTab(3)" v-if="activity">活动推荐</span>
      </div>
      <!-- 添加按钮 -->
      <div class="addbtn">
        <span class="button" v-if="AddField" @click="addActivityRecomme">+ 添加活动推荐</span>
      </div>
      <!-- 表格 -->
      <div class="activityTable">
        <el-table
          :data="activityDate"
          class="a_r_table"
          style="width:85%"
          :header-cell-style="handlemyclass"
          :row-class-name="tableRowClassName"
          border
        >
          <el-table-column prop="activityName" label="活动名称"></el-table-column>
          <el-table-column prop="storeName" label="发布商户"></el-table-column>
          <el-table-column prop="gmtModified" label="修改时间"></el-table-column>
          <el-table-column prop="gmtModifiedName" label="修改人"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button v-if="TopField" type="text">
                <span v-if="scope.row.isTop==0" @click="isTopEdit(scope.row)">置顶</span>
                <span v-else @click="isTopEdit(scope.row)">取消置顶</span>
              </el-button>
              <!-- <el-button v-if="scope.row.isTop==0" @click="isTopEdit(scope.row)" type="text">置顶</el-button>
              <el-button v-else  type="text">取消置顶</el-button>-->
              <el-button @click="UpdateEdit(scope.row)" v-if="EditField" type="text">修改</el-button>
              <el-button @click="CancelEdit(scope.row)" v-if="CancelField" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="Toolbar" v-show="total !=0">
        <el-pagination
          background
          @size-change="SizeChange"
          @current-change="CurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10,20,50]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <div>
        <!-- 添加弹框 -->
        <el-dialog
          class="el-dialog_c"
          title="添加活动推荐"
          :visible.sync="dialogVisible"
          width="750px"
          :before-close="handleClose"
        >
          <div>
            <div class="c_storename">
              <span>活动发布商户:</span>
              <div v-if="form.storename == '' ||form.storename == null">
                <el-input
                  class="select"
                  clearable
                  v-model.trim="form.activityStore"
                  placeholder="请输入内容"
                ></el-input>
                <ul class="storeList" v-if="storeDate.length !=0">
                  <li v-for="it in storeDate" :key="it.id" @click="selectStore(it)">{{it.storeName}}</li>
                </ul>
                <ul class="storeList" v-if="showNodate">
                  <li>无数据匹配</li>
                </ul>
              </div>
              <div v-else class="s_storename_c">
                <el-input class="select" v-model.trim="form.storename" placeholder="请输入内容"></el-input>
                <i class="iconfont icon-sousuo1" @click="serchActivity"></i>
              </div>
            </div>
            <div v-if="showActivityTable">
              <div class="c-table">
                <el-table
                  :data="activitySelectDate"
                  class="a_r_table"
                  style="width:100%"
                  :header-cell-style="handlemyclass"
                  border
                  height="200"
                >
                  <el-table-column prop="activityTitle" label="活动名称"></el-table-column>
                  <el-table-column prop="effectiveDate" :formatter="formatterTime" label="活动起止时间"></el-table-column>
                  <el-table-column prop="activityStatus" label="活动状态"></el-table-column>
                  <el-table-column fixed="right" label="选择" width="100">
                    <template slot-scope="scope">
                      <el-radio
                        @change.native="getTemplateRow(scope.row)"
                        :label="scope.$index"
                        v-model="radio"
                      >&nbsp;</el-radio>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-form :inline="true" :rules="rules" :model="form" ref="form">
                <div v-if="selectActivityId !=null">
                  <div style="margin-top: 20px;" class="c_form c_storename">
                    <el-form-item label="活动名称:" prop="activityName" class="infor-item">
                      <el-input
                        class="select"
                        v-model.trim="form.activityName"
                        clearable
                        placeholder="请输入内容"
                      ></el-input>
                    </el-form-item>
                  </div>
                  <div class="c_form c_storename">
                    <span class="noimg">
                      <i>*</i>活动图片:
                    </span>
                    <div class="addteacher-img">
                      <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        :on-success="successfully"
                        :on-error="onError"
                        :before-upload="beforeUpload"
                        :before-remove="beforeRemove"
                        :data="pictureSettings"
                        :action="uploadUrl"
                        accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .JPG, .JPEG, .PBG, .GIF, .BMP"
                        ref="uploadAdd"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                      <div v-if="imageUrl" class="deleteicon">
                        <i class="iconfont icon-shanchu" @click="deleteimg"></i>
                      </div>
                    </div>
                  </div>
                  <p v-if="noimg" class="notip">请选择图片</p>
                  <div style="margin-top:20px;" class="c_form c_storename">
                    <el-form-item label="活动介绍:" prop="activityIntroduction" class="infor-item">
                      <el-input
                        class="desc"
                        type="textarea"
                        placeholder="请输入活动介绍"
                        maxlength="50"
                        show-word-limit
                        clearable
                        v-model.trim="form.activityIntroduction"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button class="button" @click="sureAdd(form)">确 定</el-button>
            <el-button class="cancelbtn" @click="closemodulde">取 消</el-button>
          </span>
        </el-dialog>
        <!-- 编辑弹框 -->
        <el-dialog
          class="el-dialog_c"
          title="修改活动推荐"
          :visible.sync="dialogUpdate"
          width="500px"
          :before-close="handleUpdate"
        >
          <div>
            <el-form :inline="true" :rules="uprules" :model="upform" ref="upform">
              <div style="margin-top: 20px;" class="c_form c_storename">
                <el-form-item label="活动名称:" prop="activityName" class="infor-item">
                  <el-input
                    class="select"
                    v-model.trim="upform.activityName"
                    clearable
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="c_form c_storename">
                <span class="up_activityname">
                  <i>*</i>活动图片:
                </span>
                <div class="addteacher-img">
                  <el-upload
                    class="avatar-uploader"
                    :show-file-list="false"
                    :on-success="successimg"
                    :on-error="onError"
                    :before-upload="beforeUpload"
                    :before-remove="beforeRemove"
                    :data="pictureSettings"
                    :action="uploadUrl"
                    accept=".jpg, .jpeg, .png, .gif, .bmp, .pdf, .JPG, .JPEG, .PBG, .GIF, .BMP"
                    ref="uploadAdd"
                  >
                    <img v-if="upform.imageUrl" :src="upform.imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <div v-if="upform.imageUrl" class="deleteicon">
                    <i class="iconfont icon-shanchu" @click="deleteimg"></i>
                  </div>
                </div>
              </div>
              <p v-if="upnoimg" class="notip">请选择图片</p>
              <div style="margin-top: 20px;" class="c_form c_storename">
                <el-form-item label="活动介绍:" prop="activityIntroduction" class="infor-item">
                  <el-input
                    class="desc"
                    type="textarea"
                    placeholder="请输入活动介绍"
                    maxlength="50"
                    show-word-limit
                    clearable
                    v-model.trim="upform.activityIntroduction"
                  ></el-input>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button class="button" @click="sureUpdate(upform)">确 定</el-button>
            <el-button class="cancelbtn" @click="closeUpdateModeal">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
    <!-- 删除弹框 -->
    <selfModal ref="deleteSelect" :styleObj="styleObj">
      <div class="delete-content" @click.prevent.stop>
        <div class="top">
          <i class="iconfont icon-icon-test6"></i>
          <span class="t-title">删除活动推荐</span>
        </div>
        <div class="select1">
          <el-form>
            <div class="infor-item">
              <p class="d-c-tips">删除后将不再显示在小程序首页</p>
              <p class="d-c-tips1">你还要继续么？</p>
            </div>
            <div class="but-button">
              <el-button class="button" @click="sureCancel">确定</el-button>
              <el-button class="cancelbtn" @click="CancelClose">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </selfModal>
  </div>
</template>

<script>
import selfModal from "@/components/public/modul";
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  data() {
    return {
      upnoimg: false,
      noimg: false,
      showNodate: false, //弹框显示无数据
      dialogUpdate: false, //修改弹框
      selectActivityId: null,
      showActivityTable: false,
      showStorename: true,
      cancelDate: null,
      dialogVisible: false, //添加弹框
      form: {
        activityName: null,
        activityIntroduction: null,
        activityStore: null,
        storename: null,
        storenameId: null
      },
      upform: {
        id: null,
        activityName: null,
        activityIntroduction: null,
        activityId: null,
        imageUrl: null
      },
      rules: {
        activityName: [
          {
            required: true,
            message: "请填写活动名称",
            trigger: ["blur", "change"]
          }
        ],
        activityIntroduction: [
          {
            required: true,
            message: "请填写活动介绍",
            trigger: ["blur", "change"]
          }
        ]
      },
      uprules: {
        activityName: [
          {
            required: true,
            message: "请填写活动名称",
            trigger: ["blur", "change"]
          }
        ],
        activityIntroduction: [
          {
            required: true,
            message: "请填写活动介绍",
            trigger: ["blur", "change"]
          }
        ]
      },
      radio: null,
      storeDate: [],
      activityDate: [],
      activitySelectDate: [],
      total: 0,
      currentPage: 1,
      page: 1,
      rows: 10,
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      },
      pictureSettings: {
        file: "",
        width: 720,
        height: 720
      },
      uploadUrl: this.axios.defaults.baseURL + "/management/common/uploadImg",
      imageUrl: null
    };
  },
  computed: {
    AddField() {
      return this.publicjs.hasId("mg:market:home:activity:add");
    },
    TopField() {
      return this.publicjs.hasId("mg:market:home:activity:top");
    },
    EditField() {
      return this.publicjs.hasId("mg:market:home:activity:update");
    },
    CancelField() {
      return this.publicjs.hasId("mg:market:home:activity:delete");
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
  created() {
    this.getActivityList();
  },
  watch: {
    "form.activityStore"() {
      delay(() => {
        this.fetchData();
      }, 500);
    },
    imageUrl() {
      if (this.imageUrl == null) {
        this.noimg = true;
      } else {
        this.noimg = false;
      }
    },
    "upform.imageUrl"() {
      if (this.upform.imageUrl == null) {
        this.upnoimg = true;
      } else {
        this.upnoimg = false;
      }
    }
  },
  methods: {
    // 添加弹框活动时间处理
    formatterTime: function(row) {
      if (row.effectiveDate == "" || row.effectiveDate == null) {
        return "--";
      } else {
        return (
          row.effectiveDate.slice(0, 11) + "-" + row.expiringDate.slice(0, 11)
        );
      }
    },
    // tab跳转
    jumpTab(s) {
      switch (s) {
        case 1:
          this.$router.push({ path: "/platform/banner" });
          break;
        case 2:
          this.$router.push({ path: "/platform/SelectedStore" });
          break;
      }
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    //分页
    CurrentChange(val) {
      this.page = val;
      this.getActivityList();
    },
    SizeChange(val) {
      this.currentPage = 1;
      this.page = 1;
      this.rows = val;
      this.getActivityList();
    },
    //处理置顶不指定的样式
    tableRowClassName({ row }) {
      if (row.isTop === 1) {
        return "success-row";
      }
      return "";
    },
    // 表格数据置顶
    isTopEdit(row) {
      let a = null;
      row.isTop == 1 ? (a = 0) : (a = 1);
      this.axios
        .post("/management/activity/isTop", {
          id: row.id,
          isTop: a
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "success",
              duration: 1500
            });
            this.getActivityList();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error",
              duration: 1500
            });
          }
        });
    },
    // 删除表格数据
    CancelEdit(row) {
      this.cancelDate = row;
      this.$refs.deleteSelect.showModal = true;
    },
    // 关闭删除弹框
    CancelClose() {
      this.$refs.deleteSelect.showModal = false;
    },
    // 确认删除
    sureCancel() {
      var s=this.total.toString().split("");
      s=s[s.length-1]
      if(s==1){
        if(this.total>1){
          this.page=this.page-1;
        }
         this.initCancel();
      }else{
        this.initCancel();
      }
    },
    // 确认删除申请
    initCancel() {
      this.axios
        .post("/management/activity/deleteActivity", {
          id: this.cancelDate.id
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "success",
              duration: 1500
            });
            this.getActivityList();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error",
              duration: 1500
            });
          }
          this.$refs.deleteSelect.showModal = false;
        });
    },
    // 获取活动列表
    getActivityList() {
      this.axios
        .get("/management/activity/list", {
          params: {
            time: Date.now(),
            page: this.page,
            rows: this.rows
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.total = resp.data.total;
            this.activityDate = resp.data.data;
          }
        });
    },
    // 添加弹框中获取活动
    serchActivity() {
      this.axios
        .get("/management/homeBanner/queryActivity", {
          params: {
            time: Date.now(),
            storeId: this.form.storenameId
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.activitySelectDate = resp.data.object;
            this.activitySelectDate.length == 0
              ? (this.showActivityTable = false)
              : (this.showActivityTable = true);
          }
        });
    },
    //精确选择商户
    selectStore(t) {
      this.storeDate = [];
      this.form.activityStore = "";
      this.showStorename = false;
      this.form.storename = t.storeName;
      this.form.storenameId = t.id;
      this.serchActivity();
    },
    // 模糊搜索商户
    fetchData() {
      if (this.form.activityStore != "") {
        this.axios
          .get("/kidmanagement/store/queryStoreList", {
            params: {
              time: Date.now(),
              storeName: this.form.activityStore
            }
          })
          .then(resp => {
            if (resp.data.success) {
              this.storeDate = resp.data.object;
              if (this.storeDate.length == 0) {
                this.showNodate = true;
              } else {
                this.showNodate = false;
              }
            }
          });
      }
    },
    // 添加活动推荐
    addActivityRecomme() {
      this.dialogVisible = true;
      this.noimg = false;
    },
    //添加活动单个选中活动
    getTemplateRow(row) {
      this.selectActivityId = row.id;
      this.form.activityName = row.activityTitle;
    },
    // 确认添加活动
    sureAdd() {
      if (this.selectActivityId == null) {
        this.$message({
          showClose: true,
          message: "请选择活动",
          type: "error",
          duration: 1500
        });
      } else {
        this.$refs.form.validate(valid => {
          if (this.imageUrl == null) {
            this.noimg = true;
          } else {
            this.noimg = false;
          }
          if (valid) {
            if (!this.noimg) {
              this.AddActivity();
            }
          } else {
            return false;
          }
        });
      }
    },
    // 添加活动请求
    AddActivity() {
      this.axios
        .post("/management/activity/addActivity", {
          activityId: this.selectActivityId,
          activityName: this.form.activityName,
          compressedFilePath: this.imageUrl,
          activityIntroduction: this.form.activityIntroduction
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "success",
              duration: 1500
            });
            this.getActivityList();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error",
              duration: 1500
            });
          }
          this.closemodulde();
        });
    },
    // 关闭添加弹框
    closemodulde() {
      this.radio = null;
      this.selectActivityId = null;
      this.dialogVisible = false;
      this.showActivityTable = false;
      this.form.storename = "";
      this.form.activityStore = "";
      this.form.storename = "";
      this.imageUrl = null;
      this.activitySelectDate = null;
      this.activityIntroduction = null;
      this.activityName = null;
      this.form.activityIntroduction = "";
      this.storeDate = [];
      this.noimg = false;
    },
    handleClose(done) {
      done();
      this.closemodulde();
    },
    //上传成功返回
    successfully(resp) {
      this.imageUrl = resp.object.compressedFilePath;
    },
    successimg(resp) {
      this.upform.imageUrl = resp.object.compressedFilePath;
    },
    //图片上传失败
    onError() {
      this.$message.error("图片上传失败!");
    },
    // 移除头像
    deleteimg() {
      this.imageUrl = null;
      this.upform.imageUrl = null;
    },
    //图片上传前
    beforeUpload(file) {
      this.pictureSettings.file = { ...file, file };
      const isLt1M = file.size / 1024 / 1024 < 5;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      if (!isJPG) {
        this.msgMsg = { ...this.msgMsg, [file.uid]: "isJPG" };
        return isJPG;
      }
      if (!isLt1M) {
        this.msgMsg = { ...this.msgMsg, [file.uid]: "isLt1M" };
        return isLt1M;
      }
      const isSize = new Promise(function(resolve, reject) {
        let width = 720;
        let height = 720;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = false;
          if (img.width - img.height > 0) {
            valid = img.width >= width && img.height >= height;
          } else {
            valid = img.width >= height && img.height >= width;
          }
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
    beforeRemove(file) {
      this.butType = false;
      if (this.msgMsg[file.uid] == "isSize") {
        return this.$message.error(
          "上传的图片必须是大于" +
            this.pictureSettings.width +
            "*" +
            this.pictureSettings.height +
            "像素!"
        );
      } else if (this.msgMsg[file.uid] == "isJPG") {
        return this.$message.error("上传的图片格式应为JPG、JPEG、PNG!");
      } else if (this.msgMsg[file.uid] == "isLt1M") {
        this.$message.error("上传的图片大小不能超过1M!");
      }
    },
    // 打开修改弹框
    UpdateEdit(row) {
      this.dialogUpdate = true;
      this.upform.id = row.id;
      this.upform.imageUrl = row.compressedFilePath;
      this.upform.activityName = row.activityName;
      this.upform.activityId = row.activityId;
      this.upform.activityIntroduction = row.activityIntroduction;
    },
    // 关闭修改弹框
    handleUpdate(deco) {
      deco();
    },
    closeUpdateModeal() {
      this.dialogUpdate = false;
    },
    // 确认修改
    sureUpdate() {
      this.$refs.upform.validate(valid => {
        if (this.upform.imageUrl == null) {
          this.upnoimg = true;
        } else {
          this.upnoimg = false;
        }
        if (valid) {
          if (!this.noimg) {
            this.UpActivity();
          }
        } else {
          return false;
        }
      });
    },
    // 修改请求
    UpActivity() {
      this.axios
        .post("/management/activity/updateActivity", {
          id: this.upform.id,
          activityId: this.upform.activityId,
          activityName: this.upform.activityName,
          compressedFilePath: this.upform.imageUrl,
          activityIntroduction: this.upform.activityIntroduction
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "success",
              duration: 1500
            });
            this.getActivityList();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error",
              duration: 1500
            });
          }
          this.closeUpdateModeal();
        });
    }
  }
};
</script>

<style lang='less'>
.bordered() {
  padding: 0 40px;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.el-table .success-row {
  background: #fdf3f4;
}
.ActivityRecommendation {
  display: flex;
  flex-direction: column;

  .ActivityRecommendation_top {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);
    border-radius: 4px;
    padding: 0;
    margin-bottom: 20px;
    .b_t_title1 {
      height: 60px;
      line-height: 60px;
      width: 150px;
      background: rgba(248, 248, 248, 1);
      border-radius: 4px;
      color: rgba(51, 51, 51, 1);
      text-align: center;
    }
    .b_t_title2 {
      line-height: 60px;
      color: #2477f6;
      height: 60px;
      margin-left: 20px;
    }
  }
  .ActivityRecommendation_center {
    box-sizing: border-box;
    box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);
    flex: 1;
    border-radius: 4px;
    box-sizing: border-box;
    .ActivityRecommendation_tab {
      margin-bottom: -1px;
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
    .addbtn {
      .button {
        margin-top: 15px;
        display: inline-block;
        height: 36px;
        line-height: 34px;
        box-sizing: border-box;
      }
    }
    .activityTable {
      margin-top: 20px;
      .el-button--text {
        width: 70px;
        display: inline-block;
      }
    }
  }
  // 弹框
  .el-dialog_c {
    .el-dialog__body {
      padding: 0 20px;
    }
    .el-dialog__body {
      min-height: 100px;
    }
    .el-dialog__footer {
      padding-top: 0px;
    }
    // 商户名称
    .c_storename {
      display: flex;
      margin-top: 10px;
      position: relative;
      padding: 0;
      span {
        font-size: 14px;
        margin-right: 10px;
      }
      .select {
        display: inline-block;
        width: 280px;
        height: 36px;
      }
      .s_storename_c {
        height: 36px;
        position: relative;
        i {
          font-size: 20px;
          color: #ccc;
          position: absolute;
          right: 8px;
          top: 7px;
        }
      }
    }
    .storeList {
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      position: absolute;
      left: 95px;
      top: 41px;
      z-index: 555;
      border: 1px solid #ccc;
      width: 280px;
      box-shadow: 1px 1px 5px #ccc;
      border-radius: 4px;
      max-height: 100px;
      background-color: #fff;
      li {
        height: 28px;
        line-height: 28px;
        text-indent: 1em;
        display: block;
      }
    }
    // 表格
    .c-table {
      margin-top: 20px;
    }
    // 表单
    .c_form {
      display: flex;
      margin: 0;
      .noimg {
        i {
          color: #f56c6c;
          margin-right: 4px;
        }
      }
    }
    .up_activityname {
      i {
        color: #f56c6c;
        margin-right: 4px;
      }
    }
    .havetip {
      display: none;
    }
    .notip {
      display: block;
      color: #f56c6c;
      margin: 5px 0 15px 80px;
    }
    // 活动介绍
    .desc {
      resize: none;
      width: 340px;
    }
    .el-dialog__footer {
      margin-top: 10px;
    }
    // 头像
    .addteacher-img {
      overflow: hidden;
      position: relative;
      display: flex;
      label {
        margin-right: 10px;
        text-align: left;
        font-size: 14px;
        color: #606266;
        padding: 0 8px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 75px;
      }
      .deleteicon {
        display: inline-block;
        width: 96px;
        height: 96px;
        position: absolute;
        top: 0;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0);
        overflow: hidden;
        i {
          font-size: 25px;
          color: #fbfdff;
          line-height: 95px;
          width: 95px;
          display: none;
          text-align: center;
        }
      }
      .deleteicon:hover {
        display: inline-block;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
        width: 96px;
        height: 96px;
        i {
          display: inline-block;
        }
      }
      .el-upload {
        width: 95px;
        height: 95px;
        background-color: #fbfdff;
        display: inline-block;
        border: 1px dashed #c0ccda;
        border-radius: 4px;
        i {
          line-height: 95px;
          font-size: 30px;
          color: #d3d7e2;
        }
      }
      .el-upload:hover {
        border: 1px dashed #5092f8;
      }
      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
  }
  //   删除弹框
  .delete-content {
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
    }
  }
}
</style>
