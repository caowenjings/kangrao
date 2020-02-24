<template>
  <div class="disposeemployee">
    <div class="disposeemployee-contain">
      <p class="ReturnBut_c" @click="Return">
        <i class="iconfont icon-fanhui" style="width:14px;height:13px;color:#2477F6"></i>
        <span>返回</span>
      </p>
      <h1 class="dispose-c-name">{{username}}</h1>
      <div class="addbtn" @click="addrole">
        <button class="button">添加</button>
      </div>
      <div class="dispose-table">
        <el-table
          :data="tabledate"
          class="dispostable"
          style="min-width:55px; width:50%"
          :header-cell-style="handlemyclass"
        >
          <el-table-column prop="roleName" label="角色" width="120px"></el-table-column>
          <el-table-column prop="menuName" label="权限"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120px">
            <template slot-scope="scope">
              <el-button @click="deleteRole(scope.$index, scope.row)" type="text" size="small">
                <i class="iconfont icon-shanchu"></i>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 添加角色 -->
    <selfModal ref="decomeSelect" :styleObj="styleObj">
      <div class="addrole-contentttt" @click.prevent.stop>
        <div class="top">
          <i class="iconfont icon-icon-test6"></i>
          <span class="t-title">添加角色</span>
        </div>
        <div class="select1">
          <el-form :model="formrole" :rules="rules" :inline="true" ref="formrole">
            <div class="infor-item">
              <el-form-item label="选择角色" prop="rolename">
                <el-select
                  @visible-change="this.publicjs.visibleChange"
                  v-model="formrole.rolename"
                  clearable
                  placeholder="请选择角色"
                  style="width:188px"
                >
                  <el-option
                    v-for="(item,index) in roleoption"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <div>
                <el-form-item label="操作备注">
                  <el-input type="textarea" v-model="formrole.permissions" clearable></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="but-button">
              <el-button class="button" @click.native="sureAdd(formrole)">确定</el-button>
              <el-button class="cancelbtn" @click.native="closemodulde">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </selfModal>
    <!-- 删除角色 -->
    <selfModal ref="deleteSelect" :styleObj="styleObj">
      <div class="delete-content" @click.prevent.stop>
        <div class="top">
          <i class="iconfont icon-icon-test6"></i>
          <span class="t-title">删除角色</span>
        </div>
        <div class="select1">
          <el-form :model="formrole" :rules="rules" :inline="true" ref="formrole">
            <div class="infor-item">
              <p class="d-c-tips">该员工将失去对应的操作权限</p>
              <p class="d-c-tips1">你还要继续么？</p>
              <div>
                <el-form-item label="操作备注">
                  <el-input type="textarea" v-model="deleterole.operatingLog" clearable></el-input>
                </el-form-item>
              </div>
            </div>
            <div class="but-button">
              <el-button class="button" @click.native="suredelete">确定</el-button>
              <el-button class="cancelbtn" @click.native="closedelete">取消</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </selfModal>
  </div>
</template>

<script>
import selfModal from "@/components/public/modul";
export default {
  data() {
    var validaterole = (rule, value, callback) => {
      if (value == null || value == "") {
        callback(new Error("请选择角色"));
      } else {
        callback();
      }
    };
    return {
      employeeid: null,
      username: null,
      tabledate: [],
      roleoption: [],
      deleterole: {
        roleId: null,
        userId: null,
        operatingLog: null
      },
      formrole: {
        rolename: null,
        permissions: null,
        userId: null
      },
      rules: {
        rolename: [
          { validator: validaterole, message: "请选择角色", trigger: "blur" }
        ]
      },
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
  components: {
    selfModal
  },
  created() {
    this.getDate();
    this.getRoleList();
    this.getSetRole();
  },
  methods: {
    // 返回上一个页面
    Return() {
      this.$router.go(-1);
    },
    //   获取角色信息
    getDate() {
      var user = JSON.parse(this.$route.query.num_list);
      this.username = user.userName;
      this.formrole.userId = user.id;
      this.employeeid = JSON.parse(this.$route.query.id);
    },
    // 获取配置角色信息
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
            this.tabledate = resp.data.object;
          }
        });
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // 打开弹框
    addrole() {
      this.$refs.decomeSelect.showModal = true;
    },
    // 关闭弹框
    closemodulde() {
      this.$refs.decomeSelect.showModal = false;
      this.formrole.rolename = null;
      this.formrole.permissions = null;
    },
    closedelete() {
      this.$refs.deleteSelect.showModal = false;
      this.deleterole.operatingLog = null;
    },
    // 删除角色
    deleteRole(index, row) {
      this.deleterole.roleId = row.id;
      this.deleterole.userId = this.employeeid;
      this.$refs.deleteSelect.showModal = true;
    },
    suredelete() {
      this.axios
        .get("/management/system/deleteRoleForUser", {
          params: {
            time: Date.now(),
            userId: this.deleterole.userId,
            roleId: this.deleterole.roleId,
            operatingLog: this.deleterole.operatingLog
          }
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.getSetRole();
            this.deleterole.operatingLog = null;
            this.$refs.deleteSelect.showModal = false;
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error"
            });
            this.deleterole.operatingLog = null;
            this.$refs.deleteSelect.showModal = false;
          }
        });
    },
    // 添加角色
    sureAdd() {
      this.$refs.formrole.validate(valid => {
        if (valid) {
          this.giveRole();
        } else {
          return false;
        }
      });
    },
    giveRole() {
      this.axios
        .post("/management/system/addRoleForUser", {
          userId: this.formrole.userId,
          roleId: this.formrole.rolename,
          operatingLog: this.formrole.permissions
        })
        .then(resp => {
          if (resp.data.success) {
            this.$message({
              showClose: true,
              message: "恭喜你，添加成功",
              type: "success"
            });
            this.getSetRole();
            this.$refs.decomeSelect.showModal = false;
            this.formrole.rolename = null;
            this.formrole.permissions = null;
          } else {
            this.$message({
              showClose: true,
              message: resp.data.msg,
              type: "error"
            });
            this.formrole.rolename = null;
            this.formrole.permissions = null;
            this.$refs.decomeSelect.showModal = false;
          }
        });
    },
    // 获取角色下拉列表
    getRoleList() {
      this.axios
        .get("/management/system/queryRoleList", {
          params: {
            time: Date.now(),
            addShow: 1
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            var array = resp.data.object;
            var array2 = [];
            array.map(item => {
              array2.push(
                Object.assign({}, { value: item.id, label: item.roleName })
              );
            });
            this.roleoption = array2;
          }
        });
    }
  }
};
</script>

<style lang='less'>
.disposeemployee {
  .el-tabs__header {
    margin: 0;
  }
  .disposeemployee-contain {
    .dispose-c-name {
      margin-top: 10px;
      font-size: 30px;
      font-weight: 400;
      color: rgba(48, 54, 65, 1);
      padding: 0;
      margin-bottom: 20px;
    }
    .dispostable {
      button {
        i {
          color: #5092f8;
          font-size: 20px;
        }
      }
    }
    .el-table td {
      padding: 6px 0 !important;
    }
    .addbtn {
      margin-bottom: 20px;
      width: 50%;
      font-size: 14px !important;
    }
  }
  //添加角色模态弹框
  .addrole-contentttt {
    min-width: 500px;
    width: 500px;
    height: 325px;
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
      height: auto;
      overflow: hidden;
      margin-top: 15px;
      margin-bottom: 15px;
      i {
        float: left;
        font-size: 30px;
        color: #5092f8;
      }
      .t-title {
        font-size: 18px;
        font-weight: 500;
        color: rgba(36, 119, 246, 1);
        margin-left: 10px;
        float: left;
        margin-top: 8px;
      }
    }
    .el-form-item__label {
      color: #888888;
    }
    .el-textarea__inner {
      height: 120px;
      width: 310px;
    }
    .select1 {
      margin-left: 40px;
    }
    .but-button {
      margin-right: 11px;
      float: right;
    }
  }
  //   删除弹框
  .delete-content {
    min-width: 500px;
    width: 500px;
    height: 318px;
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
      margin-right: 21px;
      float: right;
    }
  }
}
</style>
