<template>
  <div class="employee">
    <el-tabs class="content">
      <div class="seach">
        <!-- 筛选 -->
        <el-form :inline="true">
          <el-form-item label="角色:" class="infor-item">
            <el-select
              @visible-change="this.publicjs.visibleChange"
              v-model="roleId"
              placeholder="请选择"
              clearable
              class="choice_list"
            >
              <el-option
                v-for="item in roleoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="员工状态:" class="infor-item">
            <el-select v-model="isValid" placeholder="请选择" class="choice_list">
              <el-option
                v-for="item in employeesstate"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item class="infor-item">
            <div class="searchtext">
              <el-input placeholder="输入姓名搜索" v-model="employeeName" clearable style="width:168px"></el-input>
              <el-button class="search button" style=" height: 40px !important;" @click="search">查询</el-button>
              <!-- <i class="iconfont icon-icon-test1"></i> -->
            </div>
          </el-form-item>
        </el-form>
        <!-- 创建 -->
        <div class="add">
          <el-button class="add-btn button" v-if="AddField" @click="addbtn(-1)">添加</el-button>
        </div>
        <!-- 表格 -->
        <div class="tabelllll">
          <el-table
            :data="employeetabledate"
            class="classtable"
            style="width:85%"
            :header-cell-style="handlemyclass"
            border
          >
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="roleNames" label="角色" :formatter="formatroleNames"></el-table-column>
            <el-table-column prop="cellphone" label="联系方式"></el-table-column>
            <el-table-column fixed="right" v-if="LookField" label="管理">
              <template slot-scope="scope">
                <el-button
                  @click="handleEdit(scope.$index, scope.row)"
                  :disabled="scope.row.roleNames == '管理员'"
                  type="text"
                  v-if="LookField"
                >查看员工详情</el-button>
                <el-button
                  :disabled="scope.row.roleNames == '管理员'"
                  @click="CancelEdit(scope.row)"
                  v-if="cancelField"
                  type="text"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 分页-->
      <div class="Toolbar">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,15,20, 25,]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
      <!-- 删除弹框 -->
      <selfModal ref="deleteSelect" :styleObj="styleObj">
        <div class="delete-content" @click.prevent.stop>
          <div class="top">
            <i class="iconfont icon-icon-test6"></i>
            <span class="t-title">删除员工</span>
          </div>
          <div class="select1">
            <el-form>
              <div class="infor-item">
                <p class="d-c-tips">员工删除后不可恢复</p>
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
    </el-tabs>
  </div>
</template>
<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    return {
      CancelId: null,
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
      styleObj: {
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        background: "rgba(113, 111, 111, 0.5)",
        width: "100%"
      }
    };
  },
  computed: {
    // 添加员工
    AddField() {
      return this.publicjs.hasId("mg:emp:empadd");
    },
    LookField() {
      return this.publicjs.hasId("mg:emp:empinfo");
    },
    cancelField() {
      return this.publicjs.hasId("mg:emp:empdelete");
    }
  },
  components: {
    selfModal
  },
  methods: {
    formatroleNames: function(row) {
      if (row.roleNames == "" || row.roleNames == null) {
        return "--";
      } else {
        return row.roleNames;
      }
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // 筛选
    search() {
      this.page = 1;
      this.initDate();
    },
    // 删除员工
    CancelEdit(row) {
      this.$refs.deleteSelect.showModal = true;
      this.CancelId = row;
    },
    CancelClose() {
      this.$refs.deleteSelect.showModal = false;
    },
    // 确定删除
    sureCancel() {
      var s = this.total.toString().split("");
      s = s[s.length - 1];
      if (s == 1) {
        if (this.total > 1) {
          this.page = this.page - 1;
        }
        this.initCancel();
      } else {
        this.initCancel();
      }
    },
    initCancel() {
      this.axios
        .post("/management/user/deleteUser", {
          id: this.CancelId.id
        })
        .then(resp => {
          if (resp.status == 200) {
            if (resp.data.success) {
              this.$message({
                showClose: true,
                message: "恭喜你，删除成功",
                type: "success"
              });
              this.page = 1;
              this.initDate();
            } else {
              this.$message({
                showClose: true,
                message: resp.data.msg,
                type: "warning"
              });
            }
            this.$refs.deleteSelect.showModal = false;
          }
        });
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
    addbtn(id) {
      this.$router.push({ path: "/addemployee", query: { num_id: id } });
    },
    // 工具条
    handleCurrentChange(val) {
      this.page = val;
      this.initDate();
    },
    handleSizeChange(val) {
      this.rows = val;
      this.currentPage = 1;
      this.page = 1;
      this.initDate();
    },
    // 获取员工列表信息
    initDate() {
      this.axios
        .get("/management/user/queryUsers", {
          params: {
            time: Date.now(),
            page: this.page,
            rows: this.rows,
            roleId: this.roleId,
            userName: this.employeeName
          }
        })
        .then(resp => {
          if (resp.data.data != null) {
            this.total = parseInt(resp.data.total);
            this.employeetabledate = resp.data.data;
            let lengths = this.employeetabledate.length;
            for (var i = 0; i < lengths; i++) {
              if (this.employeetabledate[i].gender != null) {
                this.employeetabledate[i].gender =
                  this.employeetabledate[i].gender == 1 ? "男" : "女";
              } else {
                this.employeetabledate[i].gender = "--";
              }
              this.employeetabledate[i].isValid =
                this.employeetabledate[i].isValid == 1 ? "在职" : "离职";
            }
          }
        });
    }
  },
  created() {
    //   获取员工角色
    this.axios.get("/management/system/queryRoleList", {}).then(resp => {
      var array = resp.data.object;
      var array2 = [];
      array.map(item => {
        array2.push(
          Object.assign({}, { value: item.id, label: item.roleName })
        );
      });
      this.roleoptions = array2;
    });
  },
  mounted() {
    this.initDate();
  }
};
</script>

<style lang="less">
.employee {
  .tabelllll {
    button {
      background: none !important;
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
