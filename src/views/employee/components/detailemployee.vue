<template>
  <div class="detailemployee">
    <div class="detailemployee-contain">
      <p class="ReturnBut_c" @click="Return">
        <i class="iconfont icon-fanhui"></i>
        <span>返回</span>
      </p>
      <div class="datailemployee-top">
        <h1
          class="detailname"
        >{{information.userName == null ? information.userName ="--" :information.userName}}</h1>
        <p>{{information.roleNames==null ||information.roleNames=="" ? information.roleNames="--" :information.roleNames}}</p>
        <p>
          创建日期:
          <span>{{information.gmtCreate}}</span>
        </p>
      </div>
      <div class="datailemployee-center">
        <div class="d-c-title">
          <div class="d-c-title-l">
            <i></i>
            <span>员工基本信息</span>
          </div>
          <div class="d-c-title-r" style="cursor:pointer;" @click="editoremployee">
            <i class="iconfont icon-icon-test2"></i>
            <span>编辑</span>
          </div>
        </div>
        <div class="employee-infor">
          <p class="d-c-item">
            <span class="d-c-item-t">姓名</span>：
            <span
              class="d-c-item-c"
            >{{information.userName == null ? information.userName ="--" :information.userName}}</span>
          </p>
          <p class="d-c-item">
            <span class="d-c-item-t">身份证号</span>：
            <span
              class="d-c-item-c1"
            >{{information.idcard == null ||information.idcard == "" ? information.idcard = "--" : information.idcard}}</span>
          </p>
          <p class="d-c-item1">
            <span class="d-c-item-t">性别</span>：
            <span>{{information.gender}}</span>
          </p>
        </div>
        <div class="employee-infor">
          <p class="d-c-item">
            <span class="d-c-item-t">出生日期</span>：
            <span
              class="d-c-item-c"
            >{{information.birthday==null ||information.birthday=="" ? information.birthday ="--" :information.birthday }}</span>
          </p>
          <p class="d-c-item">
            <span class="d-c-item-t">联系方式</span>：
            <span
              class="d-c-item-c1"
            >{{information.cellphone==null ||information.cellphone=="" ? information.cellphone ="--" : information.cellphone }}</span>
          </p>
          <p class="d-c-item1">
            <span class="d-c-item-t">婚姻状态</span>：
            <span>{{information.marriage }}</span>
          </p>
        </div>
        <div class="employee-infor">
          <p class="d-c-item">
            <span class="d-c-item-t">学历</span>：
            <span class="d-c-item-c">{{information.education}}</span>
          </p>
          <p class="d-c-item">
            <span class="d-c-item-t">毕业院校</span>：
            <span
              class="d-c-item-c1"
            >{{information.graduate==null || information.graduate=="" ? information.graduate ="--" : information.graduate }}</span>
          </p>
          <p class="d-c-item1">
            <span class="d-c-item-t">毕业专业</span>：
            <span>{{information.major==null || information.major=="" ? information.major ="--" : information.major }}</span>
          </p>
        </div>
        <div class="employee-infor">
          <p class="d-c-item">
            <span class="d-c-item-t">邮箱</span>：
            <span
              class="d-c-item-c"
            >{{information.email==null || information.email=="" ? information.email ="--" : information.email }}</span>
          </p>
          <p class="d-c-item">
            <span class="d-c-item-t">通讯地址</span>：
            <span>{{information.address==null || information.address=="" ? information.address ="--" : information.address }}</span>
          </p>
        </div>
        <div class="employee-infor">
          <p class="d-c-item">
            <span class="d-c-item-t">联系人</span>：
            <span
              class="d-c-item-c"
            >{{information.contact==null || information.contact=="" ? information.contact ="--" : information.contact }}</span>
          </p>
          <p class="d-c-item">
            <span class="d-c-item-t">关系</span>：
            <span class="d-c-item-c1">{{information.contactRel}}</span>
          </p>
          <p class="d-c-item1">
            <span class="d-c-item-t">电话</span>：
            <span>{{information.contactPhone==null || information.contactPhone=="" ? information.contactPhone ="--" : information.contactPhone }}</span>
          </p>
        </div>
      </div>
      <div class="datailemployee-bottom">
        <div class="d-c-title">
          <div class="d-c-title-l">
            <i></i>
            <span>员工角色</span>
          </div>
          <div class="d-c-title-r" style="cursor:pointer;" @click="disposeemployee">
            <i class="iconfont icon-canshupeizhi"></i>
            <span>配置</span>
          </div>
        </div>
        <div class="bott-cont rolinfo">
          <el-table :data="tableData" style="width: 100%;margin-top:10px">
            <el-table-column prop="roleName" label="角色名" width="180"></el-table-column>
            <el-table-column prop="menuName" label="权限" :formatter="formatmenuName"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeid: null,
      information: {},
      tableData: []
    };
  },
  created() {
    this.employeeid = JSON.parse(this.$route.query.num_id);
    this.initDate();
    this.getSetRole();
  },
  methods: {
    formatmenuName: function(row) {
      if (row.menuName == "" || row.menuName == null) {
        return "--";
      } else {
        return row.menuName;
      }
    },
    // 返回上一个页面
    Return() {
      this.$router.push({
        path: "/employee"
      });
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // 配置
    disposeemployee() {
      this.$router.push({
        path: "/disposeemployee",
        query: {
          num_list: JSON.stringify(this.information),
          id: JSON.stringify(this.employeeid)
        }
      });
    },
    //   编辑
    editoremployee() {
      this.employeeid = JSON.parse(this.$route.query.num_id);
      this.$router.push({
        path: "/addemployee",
        query: { num_id: this.employeeid }
      });
    },
    // 获取员工信息
    initDate() {
      this.employeeid = JSON.parse(this.$route.query.num_id);
      this.axios
        .get("/management/user/getUser", {
          params: {
            time: Date.now(),
            id: this.employeeid
          }
        })
        .then(resp => {
          if (resp.status == 200) {
            this.information = resp.data.object;
            // 创建时间
            var time = this.information.gmtCreate.slice(0, 10);
            this.information.gmtCreate == null ||
            this.information.gmtCreate == ""
              ? (this.information.gmtCreate = "--")
              : (this.information.gmtCreate = time);
            if (this.information.gender == 1) {
              this.information.gender = "男";
            } else if (this.information.gender == 0) {
              this.information.gender = "女";
            } else {
              this.information.gender = "--";
            }
            if (this.information.marriage == 1) {
              this.information.marriage = "已婚";
            } else if (this.information.marriage == 0) {
              this.information.marriage = "未婚";
            } else {
              this.information.marriage = "--";
            }
            // 学历
            if (this.information.education == 1) {
              this.information.education = "高中";
            } else if (this.information.education == 2) {
              this.information.education = "专科";
            } else if (this.information.education == 3) {
              this.information.education = "本科";
            } else if (this.information.education == 4) {
              this.information.education = "硕士";
            } else if (this.information.education == 5) {
              this.information.education = "博士";
            } else {
              this.information.education = "--";
            }
            // 联系人关系
            if (this.information.contactRel == 1) {
              this.information.contactRel = "紧急联系人";
            } else if (this.information.contactRel == 2) {
              this.information.contactRel = "日常联系人";
            } else if (this.information.contactRel == 100) {
              this.information.contactRel = "其他";
            } else {
              this.information.contactRel = "--";
            }
          }
        });
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
            this.tableData = resp.data.object;
          }
        });
    }
  }
};
</script>

<style lang="less">
.detailemployee {
  .detailemployee-contain {
    .el-tabs__header {
      margin: 0;
    }
    // 标题
    .d-c-title {
      .d-c-title-l {
        display: flex;
        align-items: center;
        i {
          width: 4px;
          height: 16px;
          display: inline-block;
          background-color: #2477f6;
        }
        span {
          color: #2477f6;
          margin-left: 5px;
        }
      }
      .d-c-title-r {
        float: right;
        color: #5092f8;
        i {
          font-size: 14px;
        }
      }
      .d-c-title-r:hover {
        color: #2477f6;
      }
    }
    .datailemployee-top {
      margin-top: 20px;
      .detailname {
        font-size: 30px;
        line-height: 30px;
        color: rgba(48, 54, 65, 1);
        margin-top: -10px;
      }
      p {
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
        margin-top: 15px;
      }
    }
    .datailemployee-center {
      width: 900px;
      border-top: 1px solid #d3d7e2;
      border-bottom: 1px solid #d3d7e2;
      padding: 15px 0;
      margin-top: 15px;
      .d-c-item {
        margin-right: 130px;
        font-size: 14px;
        color: rgba(89, 96, 124, 1);
        display: inline-block;
        .d-c-item-t {
          width: 64px;
          display: inline-block;
          text-align: justify;
          text-align-last: justify;
        }
      }
      .d-c-item1 {
        font-size: 14px;
        color: rgba(89, 96, 124, 1);
        display: inline-block;
        .d-c-item-t {
          width: 64px;
          display: inline-block;
          text-align: justify;
          text-align-last: justify;
        }
      }
      .d-c-item-c {
        display: inline-block;
        width: 100px;
      }
      .d-c-item-c1 {
        display: inline-block;
        width: 140px;
      }
    }
    .employee-infor {
      margin-top: 20px;
    }
    .datailemployee-bottom {
      margin-top: 20px;
      width: 900px;
      .rolinfo {
        border: none;
        padding: 20px 0px 20px 0;
        .tips {
          padding-right: 35px;
          box-sizing: border-box;
        }
        .el-table th > .cell {
          color: #5092f8;
          font-size: 15px;
        }
        .el-table .warning-row {
          background: rgba(36, 119, 246, 0.1);
        }

        .el-table .success-row {
          background: #f0f9eb;
        }
      }
    }
  }
}
</style>
