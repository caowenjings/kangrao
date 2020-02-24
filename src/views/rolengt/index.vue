<template>
  <div class="rolengt">
    <div class="employee-content">
      <div class="add">
        <span @click="add">添加机器人</span>
        <span @click="cancel">批量删除</span>
      </div>
      <div class="table">
        <el-table
          :data="tabledate"
          class="table"
          border
          :header-cell-style="handlemyclass"
          @selection-change="handleSelectionChange"
        >
          <!-- <el-table-column type="index" label="序号" width="60"></el-table-column> -->
          <el-table-column type="selection" width="65"></el-table-column>
          <el-table-column prop="accountName" label="账号"></el-table-column>
          <el-table-column prop="identitySecret" label="apiKey"></el-table-column>
          <el-table-column prop="status" label="状态" :formatter="formatmenuName"></el-table-column>
          <el-table-column prop="country" label="地区" :formatter="formatcountry"></el-table-column>
          <el-table-column prop="balance" label="余额" :formatter="formatbalance"></el-table-column>
          <el-table-column width="270" label="操作">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status == 1"
                @click="handleNoLogin(scope.row)"
                type="text"
              >注销</el-button>
              <el-button v-else @click="handelLogin(scope.row)" type="text">登录</el-button>
              <el-button
                v-if="scope.row.autoQuote == 0"
                @click="handleAuto(scope.row)"
                type="text"
              >开启自动报价</el-button>
              <el-button v-else @click="handleCloseAuto(scope.row)" type="text">关闭自动报价</el-button>
              <el-button @click="handleBot(scope.row)" type="text">编辑</el-button>
              <!-- :disabled="scope.row.status==0" -->
              <el-button @click="handleNum(scope.row)" :disabled="scope.row.status==0" type="text">查看库存</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页-->
      <div class="Toolbar" v-if="total">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10,15,20,25]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
      tabledate: [],
      multipleSelection: [],
      page: 1,
      rows: 10,
      currentPage: 1,
      form: {
        msg: ""
      }
    };
  },
  created() {
    this.initDate();
  },
  methods: {
    formatmenuName: function(row) {
      if (row.status == 1) {
        return "登录";
      } else if (row.status == 0) {
        return "未登录";
      } else {
        return "--";
      }
    },
    formatbalance: function(row) {
      if (row.balance == null || row.balance == "") {
        return "--";
      } else {
        return row.balance;
      }
    },
    formatcountry: function(row) {
      if (row.country == null || row.country == "") {
        return "--";
      } else {
        return row.country;
      }
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
    // 关闭自动报价
    handleCloseAuto(row) {
      this.axios
        .post(this.constant.url1 + "bots/autoOff", {
          id: row.id,
          accountName: row.accountName
        })
        .then(resp => {
          if (resp.status == 200) {
            this.$message({
              showClose: true,
              message: "操作成功",
              type: "success"
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: "操作失败，请重试",
              type: "warning"
            });
          }
        });
    },
    // 开启自动报价
    handleAuto(row) {
      this.axios
        .post(this.constant.url1 + "bots/auto", {
          id: row.id,
          accountName: row.accountName
        })
        .then(resp => {
          console.log(4545, resp);
          if (resp.status == 200) {
            this.$message({
              showClose: true,
              message: "操作成功",
              type: "success"
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: "操作失败，请重试",
              type: "warning"
            });
          }
        });
    },
    // 批量选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 批量删除
    cancel() {
      var num = [];
      var len = this.multipleSelection.length;
      for (let i = 0; i < len; i++) {
        num.push(this.multipleSelection[i].id);
      }
      this.axios
        .post(this.constant.url + "bot/ids", {
          ids: num,
          num: 1
        })
        .then(resp => {
          if (resp.status == 200) {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: "删除失败，请重试",
              type: "warning"
            });
          }
        });
    },
    // 设置表头颜色
    handlemyclass: function() {
      return "background-color:rgba(245,245,245,1);color:#28282F;font-weight:bold;font-size:16px;";
    },
    // 退出登录
    handleNoLogin(row) {
      this.axios
        .post(this.constant.url1 + "bots/logoff", {
          id: row.id,
          accountName: row.accountName
        })
        .then(resp => {
          console.log(4545, resp);
          if (resp.status == 200) {
            this.$message({
              showClose: true,
              message: "机器人注销成功",
              type: "success"
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: "机器人注销失败,请重试",
              type: "warning"
            });
          }
        });
    },
    // 添加
    add() {
      this.$router.push({
        path: "/setRole",
        query: { id: -1 }
      });
    },
    handleBot(row) {
      this.$router.push({
        path: "/setRole",
        query: { id: 2, num: JSON.stringify(row) }
      });
    },
    // 机器人登录
    handelLogin(row) {
      this.initLogin(row);
    },
    // 登录请求
    initLogin(row) {
      this.axios
        .post(this.constant.url1 + "bots/login", {
          id: row.id,
          accountName: row.accountName,
          password: row.password,
          twoFactorCode: row.twoFactorCode,
          identity_secret: row.identitySecret
        })
        .then(resp => {
          console.log(4545, resp);
          if (resp.status == 200) {
            this.$message({
              showClose: true,
              message: "机器人登录成功",
              type: "success"
            });
            this.initDate();
          } else {
            this.$message({
              showClose: true,
              message: "机器人登录失败，请重试",
              type: "warning"
            });
          }
        });
    },
    // 跳转库存列表
    handleNum(row) {
      this.$router.push({
        path: "/numberList",
        query: { id: JSON.stringify(row) }
      });
    },
    // 请求机器人列表
    initDate() {
      this.axios
        .post(this.constant.url + "bot/page", {
          page: this.page,
          size: this.rows
        })
        .then(resp => {
          if (resp.status == 200) {
           
            this.tabledate = resp.data.payload.botList.content;
            this.total = resp.data.payload.total;
          }
        });
    }
  }
};
</script>

<style lang='less'>
.rolengt {
  font-size: 23px;
  .add {
    span {
      display: inline-block;
      height: 40px;
      padding: 0 20px;
      background-color: #444;
      color: #fff;
      border-radius: 5px;
      line-height: 40px;
      font-size: 18px;
      margin-bottom: 20px;
      cursor: pointer;
    }
    span:hover {
      background-color: #000;
    }
  }
  .Toolbar {
    .el-input__inner {
      background-color: #2c3040;
      color: #fff;
      border: 1px solid #2c3040 !important;
    }

    .el-pagination .el-pager,
    .Toolbar .el-pagination .el-pager li {
      background-color: #2c3040 !important;
    }
    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background-color: #2c3040 !important;
      border: 1px solid #2c3040 !important;
      color: #fff;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      margin: 0 5px;
      background-color: #2c3040;
      color: #fff;
      min-width: 30px;
      border-radius: 2px;
    }
    .el-pagination .el-pager,
    .el-pagination .el-pager li {
      background-color: #2c3040 !important;
      cursor: pointer;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      color: #a18551;
      background-color: #2c3040 !important;
      border-color: #a18551;
    }
  }
}
</style>
