<template>
  <div>
    <div class="banner">
      <div class="banner_center">
        <div class="banner_tab">
          <span class="active" @click="jumpTab(1)" v-if="banner">Banner推广</span>
          <span @click="jumpTab(2)" v-if="store">精选商户</span>
          <span @click="jumpTab(3)" v-if="activity">活动推荐</span>
        </div>
      </div>
      <div class="banner_contents">
        <!-- 创建 -->
        <div class="add">
          <el-button class="add-btn button" v-if="AddField" @click="addbtn(-1)">+ 添加Banner</el-button>
        </div>
        <!-- 表格 -->
        <div class="tabelllll">
          <el-table
            :data="employeetabledate"
            class="classtable"
            style="width:85%"
            :header-cell-style="handlemyclass"
            :row-class-name="tableRowClassName"
            border
          >
            <!-- <el-table-column type="index" label="序号" align="center" width="80"></el-table-column> -->
            <el-table-column prop="editFilePath" label="Banner">
              <template slot-scope="scope">
                <img
                 @mouseenter="mouseenter(scope.row.editFilePath)"
                  style="width: 158px; height: 96px"
                  :src="scope.row.editFilePath"
                  class="avatar"
                />
                <!--<el-image width="100%" :src="scope.row.editFilePath" alt fit="contain"  class="avatar" />-->
              </template>
            </el-table-column>
            <el-table-column prop="bannerType" label="宣传类型">
              <template slot-scope="scope">
                <div>
                  <div v-if="scope.row.bannerType ===0">图片宣传</div>
                  <div v-else-if="scope.row.bannerType ===1">商户宣传</div>
                  <div v-else-if="scope.row.bannerType ===2">活动宣传</div>
                  <div v-else-if="scope.row.bannerType ===3">推荐课程</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="content" label="跳转内容" :formatter="formatroleNames"></el-table-column>
            <el-table-column prop="gmtModified" label="修改时间"></el-table-column>
            <el-table-column prop="gmtModifiedBy" label="修改人"></el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
              <template slot-scope="scope">
                <div class="operation">
                  <!--<el-button-->
                  <!--@click="handleEdit(scope.$index, scope.row)"-->
                  <!--:disabled="scope.row.roleNames == '管理员'"-->
                  <!--type="text"-->
                  <!--size="small"-->
                  <!--v-if="LookField"-->
                  <!--&gt;查看员工详情-->
                  <!--</el-button>-->
                  <div v-if="TopField">
                    <span v-if="scope.row.isTop === 1" @click="isTop(scope.row)">取消置顶</span>
                    <span v-else @click="isTop(scope.row)">置顶</span>
                  </div>
                  <div v-if="EditField" @click="editBanner(scope.row)">编辑</div>
                  <div v-if="CancelField" @click="deleteBanner(scope.row)">删除</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 分页-->
        <!--<div class="Toolbar">-->
        <!--<el-pagination-->
        <!--background-->
        <!--@size-change="handleSizeChange"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:current-page="currentPage"-->
        <!--:page-sizes="[10,15,20, 25,]"-->
        <!--layout="total,sizes,prev, pager, next, jumper"-->
        <!--:total="total"-->
        <!--&gt;</el-pagination>-->
        <!--</div>-->
        <!--<div v-if="dialogTableVisibleData">-->
        <el-dialog :title="bannerTitle" width="470px" top="25vh" :visible.sync="dialogTableVisible">
          <div class="modal">
            <section class="career-AddActivity">
              <!--<div class="top">-->
              <!--<span class="title">添加Banner</span>-->
              <!--<span class="cancel">x</span>-->
              <!--</div>-->
              <!--<el-form ref="form" :model="form" label-width="80px" :rules="rules">-->
                <!--<el-form-item label="跳转商户:">-->
              <div class="center">
                <div class="c_storename">
                  <!--<span>Banner:</span>-->
                  <!--<el-button> Banner 上传图片</el-button>-->
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
                      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
                  <div class="banner-type">
                    <span>Banner类型:</span>
                    <el-select
                      @visible-change="this.publicjs.visibleChange"
                      v-model="course"
                      placeholder="请选择"
                      style="width:168px"
                    >
                      <el-option
                        v-for="item in courseoptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                  <br />
                  <div class="select-type" v-show="course !==0">
                    <span>{{courseSearch[course]}}</span>
                    <!--<el-input-->
                    <!--placeholder="请输入内容"-->
                    <!--v-model="input4"-->
                    <!--style="width: 245px"-->
                    <!--@change = 'search'-->
                    <!--suffix-icon>-->
                    <!--<i slot="prefix" class="el-input__icon el-icon-search"></i>-->
                    <!--</el-input>-->
                    <el-autocomplete
                      v-model="input4"
                      :fetch-suggestions="querySearchAsync"
                      placeholder="请输入内容"
                      @select="handleSelect"
                      :trigger-on-focus="false"
                      clearable
                      style="width: 244px "
                    ></el-autocomplete>
                  </div>
                  <div class="c-table" v-if="course ==2">
                    <el-table
                      :data="activityList"
                      class="a_r_table"
                      style="width:100%"
                      height="235px"
                      :header-cell-style="handlemyclass"
                      :key="Math.random()"
                      border
                    >
                      <el-table-column
                        prop="activityTitle"
                        header-align="center"
                        align="center"
                        label="活动名称"
                      ></el-table-column>
                      <el-table-column
                        prop="effectiveDate"
                        width="170"
                        header-align="center"
                        align="center"
                        label="活动起止时间"
                      >
                        <template slot-scope="scope">
                          <!--{{scope.row}}-->
                          {{scope.row.effectiveDate}} ~{{scope.row.expiringDate }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="activityStatus"
                        header-align="center"
                        align="center"
                        label="活动状态"
                      ></el-table-column>
                      <el-table-column
                        fixed="right"
                        width="50"
                        header-align="center"
                        align="center"
                        label="选择"
                      >
                        <template slot-scope="scope">
                          <el-radio
                            v-model="radio"
                            :label="scope.row.id"
                            @change="radioType(scope.row)"
                          ></el-radio>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div class="c-table" v-if="course ==3">
                    <el-table
                      :data="courseList"
                      class="a_r_table"
                      style="width:100%"
                      :header-cell-style="handlemyclass"
                      header-align="center"
                      align="center"
                      :key="Math.random()"
                      border
                    >
                      <el-table-column prop="courseName" width="80" label="课程名称"></el-table-column>
                      <el-table-column prop="effectiveDate" label="课程说明">
                        <template slot-scope="scope">
                          {{scope.row.courseType}} | {{scope.row.ageRangeS }} ~{{scope.row.courseRangeE }} |
                          {{scope.row.courseRangeS }} ~{{scope.row.courseRangeE }} 课时
                          {{ scope.row.timeRange}}
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="选择" width="50">
                        <template slot-scope="scope">
                          <!--<el-radio v-model="radio" label="2">备选项</el-radio>-->
                          <el-radio
                            v-model="radio"
                            :label="scope.row.id"
                            @change="radioType(scope.row)"
                          ></el-radio>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <div class="select1">
                <div class="btn">
                  <el-button class="cancelbtn" @click.native="sureCancel('cancel')">取消</el-button>
                  <el-button class="button" @click.native="surechange('confirm')">确定</el-button>
                </div>
              </div>
            </section>
          </div>
        </el-dialog>
        <!--</div>-->
      </div>
      <!--<div>-->

      <!--</div>-->
    </div>
    <selfModal ref="deleteSelect" :styleObj="styleObj">
      <div class="delete-content" @click.prevent.stop>
        <div class="top">
          <i class="iconfont icon-icon-test6"></i>
          <span class="t-title">删除Banner</span>
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
    <!-- 放大图片 -->
     <selfModal ref="enlarge" :styleObj="styleObj">
        <div class="PlusImg" @click.prevent.stop>
          <div class="PlusImgBox" @mouseleave="mouseleave">
            <el-image fit="contain" :src="enlargeUrl" object-fit="contain" />
          </div>
        </div>
      </selfModal>
  </div>
  <!--</div>-->
</template>

<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    return {
      employeevalue: false,
      currentPage: 1,
      roleoptions: [],
      palcevalue: "",
      employeetabledate: [],
      employeesstate: this.constant.Employeesstate,
      page: 1,
      rows: 10,
      roleId: null,
      isValid: null,
      employeeName: null,
      total: 0,
      activityDate: [{ id: "1" }, { id: "1" }],
      rules: {},
      form: {
        email: null
      },
      dialogTableVisible: false,
      // doUpload: this.axios.defaults.baseURL+'/platform/systemManagement/uploadImg',
      doUpload: this.axios.defaults.baseURL + "/management/common/uploadImg",
      pictureSettings: {
        file: "",
        width: 690,
        height: 330
      },
      imageUrl: "",
      dialogTableVisibleData: false,
      course: 0,
      courseoptions: [
        { value: 0, label: "图片宣传" },
        { value: 1, label: "商户宣传" },
        { value: 2, label: "活动宣传" },
        { value: 3, label: "课程宣传" }
      ],
      courseSearch: ["", "跳转商户:", "活动发布商户:", "课程发布商户:"],
      input4: "",
      radio: "",
      activityList: [],
      courseList: [],
      bannerTitle: '添加Banner',
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      },
      enlargeUrl: "",
    };
  },
  mounted() {
    this.initDate();
  },
  components: {
    selfModal
  },
  computed: {
    // 添加banner
    AddField() {
      return this.publicjs.hasId("mg:market:home:banner:add");
    },
    // banner置顶
    TopField() {
      return this.publicjs.hasId("mg:market:home:banner:top");
    },
    EditField() {
      return this.publicjs.hasId("mg:market:home:banner:update");
    },
    CancelField() {
      return this.publicjs.hasId("mg:market:home:banner:delete");
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
  methods: {
     //鼠标移入图片
    mouseenter(val) {
      this.enlargeUrl = val;
      this.$refs.enlarge.showModal = true;
    },
    //鼠标移出事件
    mouseleave() {
      this.$refs.enlarge.showModal = false;
    },
    // tab跳转
    jumpTab(s) {
      switch (s) {
        case 2:
          this.$router.push({ path: "/platform/SelectedStore" });
          break;
        case 3:
          this.$router.push({ path: "/platform/ActivityRecommendation" });
          break;
      }
    },
    //处理置顶不指定的样式
    tableRowClassName({ row }) {
      if (row.isTop === 1) {
        return "success-row";
      }
      return "";
    },
    formatroleNames: function(row) {
      if (!row.content) {
        return "--";
      } else {
        return row.content;
      }
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    radioType(radio) {
      this.radio = radio.id;
    },
    // 筛选
    Choice() {
      this.page = 1;
      this.initDate();
    },
    search() {
      this.page = 1;
      this.initDate();
    },
    // 操作查看
    handleEdit(index, row) {
      if (row.roleNames != "管理员") {
        this.$router.push({
          path: "/detailemployee",
          query: { num_id: JSON.stringify(row.id) }
        });
      }
    },
    addbtn() {
      this.dialogTableVisible = true;
      this.course = 0;
      this.imageUrl = "";
      this.commonId = "";
      this.input4 = "";
      this.edit = false;
      this.bannerTitle = '+ 添加Banner'
    },
    // 工具条
    handleCurrentChange(val) {
      this.page = val;
      this.initDate();
    },
    handleSizeChange(val) {
      this.rows = val;
      this.initDate();
    },
    // banner 列表
    initDate() {
      this.axios
        .get("/management/homeBanner/queryBanner", {
          params: {
            time: Date.now(),
            page: this.page,
            rows: this.rows,
            roleId: this.roleId,
            userName: this.employeeName
          }
        })
        .then(resp => {
          if (resp.data.object != null) {
            this.total = parseInt(resp.data.total);
            this.employeetabledate = resp.data.object;
          }
        });
    },
    surechange(param) {
      console.log(param, this.course,'---SSS---');
      if (!this.edit) {
        this.addPicture();
      } else {
        this.editPicture();
      }
    },
    sureCancel() {
      this.dialogTableVisible = false;
    },
    //图片上传失败
    onError() {
      this.$message.error("图片上传失败!");
    },
    beforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/bmp" ||
        file.type === "image/jpg";
      if (!isJPG) {
        this.$message.error("图片格式不正确 !");
        return false;
      }
      const isSizeFile = file.size / 1024 / 1024 > 5;
      if (isSizeFile) {
        this.$message.error("上传头像图片大不能大于 5M!");
        return false;
      }
      this.pictureSettings.file = file;
      const isSize = new Promise(function(resolve, reject) {
        let width = 690;
        let height = 330;
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
          this.$message.error(
            "上传的图片必须是等于或大于" +
              this.pictureSettings.width +
              "*" +
              this.pictureSettings.height +
              "!"
          );
          return Promise.reject();
        }
      );
      return isSize;
    },
    //上传成功返回
    successfully(response) {
      if (Object.keys(response.object)) {
        this.imageUrl = response.object.originalFilePath;
      }
    },
    deleteimg() {
      this.imageUrl = null;
      this.teacherform.headImage = "";
    },
    getSetRole() {
      this.axios
        .get("/management/user/getRoleList", {
          params: {
            time: Date.now(),
            id: this.employeeid
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.tableData = resp.data.object;
          }
        });
    },
    querySearchAsync(queryString, cb) {
      if (!queryString) return;
      this.axios
        .get("/kidmanagement/store/queryStoreList", {
          params: {
            time: Date.now(),
            storeName: queryString
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            // this.tableData = resp.data.object; value address
            let queryResult = resp.data.object.map(item => {
              return {
                value: item.storeName,
                id: item.id
              };
            });
            cb(queryResult);
          }
        });
      // var restaurants = this.restaurants;
      // var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
      //
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   cb(results);
      // }, 3000 * Math.random());
    },
    handleSelect(item) {
      console.log(item, this.input4,'----');
      if (this.course === 1) {
        this.commonId = item.id;
      }
      if (!item.id) return;
      if (this.course === 2) {
        this.getQueryList(item);
      } else if (this.course === 3) {
        this.getCourseList(item);
      }
    },
    getQueryList(item) {
      this.axios
        .get("/management/homeBanner/queryActivity", {
          params: {
            time: Date.now(),
            storeId: item.id
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.activityList = resp.data.object;
          }
        });
    },
    // 课程列表 course
    getCourseList(item) {
      this.axios
        .get("/management/homeBanner/queryPropCourse", {
          params: {
            time: Date.now(),
            storeId: item.id
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.courseList = resp.data.object;
          }
        });
    },
    addPicture() {
      if (!this.imageUrl) {
        this.$message.error("请上传图片!");
        return;
      }
      if (this.course > 1) {
        this.commonId = this.radio;
        if (this.course === 2 && !this.radio) {
          this.$message.error("请选择活动");
          return;
        } else if (this.course === 3 && !this.radio) {
          this.$message.error("请选择课程");
          return;
        }
      }
      this.axios
        .post("/management/homeBanner/addBanner", {
          commonId: this.commonId ? this.commonId : 0,
          bannerType: this.course,
          editFilePath: this.imageUrl
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "添加成功!",
              type: "success"
            });
            this.dialogTableVisible = false;
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error"
            });
          }
        });
    },
    isTop(row) {
      this.axios
        .post("/management/homeBanner/topBanner", {
          id: row.id,
          isTop: row.isTop ? 0 : 1
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "操作成功!",
              type: "success"
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error"
            });
            // this.dialogTableVisible = false
          }
        });
    },
    deleteBanner(row){
      this.$refs.deleteSelect.showModal = true;
      this.row = row
    },
    //删除
    modificationOut() {
      this.deleteBannerAffirm()
    },
    deleteBannerAffirm() {
      this.axios
        .post("/management/homeBanner/deleteBanner", {
          id: this.row.id,
          isTop: this.row.isTop
        })
        .then(resp => {
          if (resp.data.success) {
            this.$refs.deleteSelect.showModal = false;
            this.$message({
              showClose: true,
              message: "操作成功!",
              type: "success"
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error"
            });
          }
        });
    },
    addPicturess() {
      if (!this.imageUrl) {
        this.onError();
        return;
      }
      this.axios
        .post("/management/homeBanner/addBanner", {
          commonId: this.commonId ? this.commonId : 0,
          bannerType: this.course,
          editFilePath: this.imageUrl
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "添加成功!",
              type: "success"
            });
          }
          this.dialogTableVisible = false;
        });
    },
    editBanner(row) {
      this.dialogTableVisible = true;
      this.course = 0;
      this.imageUrl = "";
      this.commonId = "";
      this.edit = true;
      this.bannerTitle = '编辑Banner'
      this.itemId = ''
      this.bannerReverse(row);
    },
    editPicture() {
      if (!this.imageUrl) {
        this.$message.error("请上传图片!");
        return;
      }
      if (this.course > 1) {
        this.commonId = this.radio;
        if (this.course === 2 && !this.radio) {
          this.$message.error("请选择活动");
          return;
        } else if (this.course === 3 && !this.radio) {
          this.$message.error("请选择课程");
          return;
        }
      }
      this.axios
        .post("/management/homeBanner/updateBanner", {
          id:this.itemId,
          commonId: this.commonId ? this.commonId : 0,
          bannerType: this.course,
          editFilePath: this.imageUrl,
          isTop: this.isTop
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "修改成功!",
              type: "success"
            });
            this.dialogTableVisible = false;
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error"
            });
          }
        });
    },
    // 反查
    bannerReverse(row){
      this.axios
        .get("/management/homeBanner/queryBannerById", {
          params: {
            time: Date.now(),
            id: row.id
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            // this.tableData = resp.data.object; value address
            console.log(resp.data.object, "===");
            this.itemId = resp.data.object.id
            let item = resp.data.object;
            this.input4 = item.storeName;
            this.storeId = item.storeId;
            this.isTop = item.isTop;

            if (item.bannerType === 2) {
              this.getQueryList({ id: item.storeId });
            } else if (item.bannerType === 3) {
              this.getCourseList({ id: item.storeId });
            }
            this.imageUrl = item.editFilePath;
            this.course = item.bannerType;
            this.radio = row.commonId;
          }
        });
    },
    closedelete() {
      this.$refs.deleteSelect.showModal = false;
    },
  },
  watch: {
    course:(val) => {
      this.imageUrl = "";
      this.commonId = "";
      this.input4 = "";
      this.radio = "";
      this.activityList = [];
      this.courseList = [];
      console.log(val);
    },
  }
};
</script>

<style lang='less'>
.banner {
  display: flex;
  flex-direction: column;
  .bordered() {
    padding: 0 40px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .banner_top {
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
  .el-table .success-row {
    background: #fdf3f4;
  }
  .banner_center {
    /*box-sizing: border-box;*/
    /*box-shadow: 0px 2px 9px 1px rgba(40, 40, 47, 0.2);*/
    /*flex: 1;*/
    /*border-radius: 4px;*/
    /*box-sizing: border-box;*/
    height: 40px;
    .banner_tab {
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
  }
  .banner_contents {
    height: 80%;
    /*background-color: #555555;*/
    .tabelllll {
      button {
        background: none !important;
      }
    }
    .operation {
      width: 180px;
      > div {
        color: #2477f6;
        float: left;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .el-form-item__label {
      font-size: 14px;
      color: rgba(40, 40, 47, 1);
      line-height: 40px;
    }
    .el-form-item {
      margin-bottom: 20px;
      margin-right: 30px;
    }
    .el-tabs__header {
      margin: 0;
    }
    // 搜索
    .searchtext {
      display: flex;
    }
    .searchtext .search {
      height: 40px;
      padding: 0 20px;
      border-radius: 4px;
      text-align: center;
      color: #fff;
      margin-left: 10px;
    }
    // 创建
    .add-btn {
      cursor: pointer;
      color: #fff;
    }
    // 班级表格
    .classtable {
      font-size: 14px;
      margin-top: 20px;
      width: 100%;
    }
    .el-table td {
      padding: 5px 0;
    }
    .Toolbar {
      width: 90%;
    }
  }
  // 添加模态弹框
  .career-AddActivity {
    margin: auto;
    box-sizing: border-box;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      border-bottom: 1px solid #d3d7e2;
      .bordered();
      .title {
        color: 333333;
        font-size: 18px;
      }
      .cancel {
        color: #d3d7e2;
        font-size: 25px;
      }
    }
    .center {
      // 商户名称
      .c_storename {
        padding: 0 20px;
        box-sizing: border-box;
        margin-bottom: 20px;
        span {
          font-size: 14px;
        }
        .select {
          display: inline-block;
          width: 150px;
          height: 36px;
        }
      }
      // 表格
      .c-table {
      }
      // 表单
      .c_form {
        .bordered();
      }
    }
    .el-radio__label {
      display: none;
    }
  }
  .select1 {
    .btn {
      float: right;
    }
    margin-bottom: 20px;
    height: 20px;
  }
  .addteacher-img {
    margin-bottom: 10px;
    overflow: hidden;
    .label {
      text-align: right;
      font-size: 14px;
      padding: 0 4px 0 0;
      float: left;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      font-weight: 400;
      span {
        color: red;
      }
    }
    .deleteicon {
      display: inline-block;
      width: 96px;
      height: 96px;
      position: relative;
      left: -96px;
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
    .el-upload {
      float: left;
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
    .deleteicon:hover {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 4px;
      width: 96px;
      height: 96px;
      i {
        display: inline-block;
      }
      cursor: pointer;
    }
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .banner-type {
    margin-top: 20px;
  }
  .select-type {
    margin-bottom: 20px;
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
    // margin: auto;
  }
}
 // 图片放大弹框
  .PlusImg {
    width: 60%;
    height: 80%;
    border-radius: 4px;
    position: absolute;
    margin-top: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    box-sizing: border-box;
    .PlusImgBox {
      padding: 20px;
      background: rgba(255, 255, 255, 1);
    }
    .c-tips {
      text-align: center;
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(87, 89, 104, 1);
    }
    .top {
      margin-left: 95px;
      height: auto;
      overflow: hidden;
    }
    .c-but-button {
      text-align: center;
      margin-top: 20px;
      .cancelbtn,
      .button {
        padding: 0;
        width: 60px;
        height: 30px !important;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
</style>
