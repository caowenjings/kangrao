<template>
  <div id="app" class="fillcontain" @mouseover="OpreatingWebsite">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    OpreatingWebsite() {
      let currentTime = this.currentTime;
      let lastTime = new Date().getTime();
      let timeOut = 1800000;
      if (lastTime - currentTime > timeOut) {
        this.currentTime = new Date().getTime();
        localStorage.removeItem("token");
        if (this.$route.fullPath != "/") {
          this.$router.history.push("/");
          this.$message({
            message: "登录超时，请重新登录",
            type: "info",
            center: true,
            duration: 1500
          });
        }
      } else {
        this.currentTime = new Date().getTime();
      }
    }
  }
};
</script>

<style lang="less">
@import "./assets/css/common";
@import url("https://at.alicdn.com/t/font_1166466_k40u0rm543l.css");
@import url("https://at.alicdn.com/t/font_1166466_wx70spvz69a.css");
.button {
  background: #414141 !important;
  border: 1px solid #414141 ;
  height: 36px !important;
  font-size: 14px!important;
  padding: 0 20px !important;
  border-radius: 4px;
  color: #fff !important;
  cursor: pointer;
  color: #fff;
}
.button:hover {
  border: 1px solid #000;
  background: #000 !important;
  cursor: pointer;
  color: #fff;
  font-size: 14px!important;
  height: 36px !important;
}
.button:active {
  background: #000 !important;
  cursor: pointer;
  color: #fff;
}
// 取消按钮
.cancelbtn {
  border: 1px solid #d3d7e2 !important;
  color: #d3d7e2 !important;
  background-color: #fff !important;
  height: 37px !important;
  border-radius: 4px;
  cursor: pointer;
}
.cancelbtn:hover {
  border-color: #000 !important;
  background-color: #fff !important;
  color: #000 !important;
  cursor: pointer;
}
//分页全部样式
.Toolbar {
  display: flex;
  margin-top: 20px;
  margin-bottom:20px;
  // 左右按钮
  .el-pagination .btn-prev {
    margin-left: 15px;
    cursor: pointer;
  }
  .el-pagination .btn-next,
  .el-pagination .btn-prev {
    background-color: #fff !important;
    border: 1px solid rgba(211, 215, 226, 1) !important;
    border-radius: 4px;
    cursor: pointer;
  }
  .el-pager li {
    background-color: #fff !important;
    border-radius: 4px;
    cursor: pointer;
  }
  .el-pagination .el-pager,
  .el-pagination .el-pager li {
    background-color: #fff !important;
    cursor: pointer;
  }
  .el-pagination .el-select .el-input .el-input__inner {
    width: 120px;
    height: 30px;
    margin-right: 20px;
  }
  .el-pagination__editor.el-input .el-input__inner {
    width: 30px;
    height: 30px;
    border: 1px solid rgba(211, 215, 226, 1);
    border-radius: 4px;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: #5092f8 !important;
    color: #fff;
    cursor: pointer;
  }
  .el-pagination .el-select .el-input {
    margin: 0 15px !important;
  }
  // 表格表头
  .el-table th {
    padding: 18px 0 !important;
  }
  .el-table td {
    height: 40px;
    padding: 0px 0 !important;
    .cell {
      font-size: 14px !important;
    }
  }
  // 设置赛选按钮
  .el-icon-sai:before {
    content: " ";
    display: block;
    height: 16px;
    width: 20px;
    background: url("./assets/img/search1.png") no-repeat;
    background-size: 100%;
  }
}

.el-table td {
  padding: 0px 0 !important;
  height: 40px;
  .cell {
    font-size: 14px !important;
    button {
      span {
        font-size: 14px !important;
      }
    }
  }
}
.el-table th {
  height: 40px;
  padding: 0;
  font-size: 14px !important;
  .cell {
    font-size: 14px !important;
    font-weight: bold !important;
    outline: none;
  }
  .cell:focus {
    outline-style: none;
    -moz-outline-style: none;
  }
}
.el-table--enable-row-transition .el-table__body td {
  outline-style: none;
  -moz-outline-style: none;
}
// 分页
.el-pagination__sizes .el-input .el-input__inner {
  cursor: pointer;
}
.el-pagination button {
  cursor: pointer;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  cursor: pointer;
}
.cancelButtonStyless {
  float: right;
  margin-left: 10px;
}
.el-input__inner {
  transition: border-color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1);
}
button {
  cursor: pointer;
}
.el-textarea__inner {
  resize: none;
}
// 返回上一个页面
.ReturnBut_c {
  color: #2477f6;
  font-size: 14px;
  i {
    width: 14px;
    height: 13px;
    color: #2477f6;
  }
}
</style>
