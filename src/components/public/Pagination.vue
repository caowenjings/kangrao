<template>
  <el-pagination
    layout="prev, pager, next"
    @current-change="handleCurrentChange"
    :page-size="pagesize"
    :total="totalnum"
    :current-page="currpage"
  ></el-pagination>
</template>
<script>
export default {
  props: ["page"],
  data() {
    return {
      totalnum: 0,
      pagesize: 8,
      currpage: 1
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    page: function() {
      this.init();
    }
  },
  methods: {
    init: function() {
      this.totalnum = parseInt(this.page.totalCount);
      this.pagesize = parseInt(this.page.pageSize);
      this.currpage = parseInt(this.page.currPage);
    },
    handleCurrentChange: function(val) {
      this.$emit("pagenationmsg", val);
    }
  }
};
</script>

<style lang="scss">
$white_color: #f6f9fc;
$grey_color: #606266;
.el-pagination {
  // padding: 30px 0 !important;
  color: $grey_color !important;
  width: 500px;
  margin: 0 auto;
  text-align: center;
  .btn-prev,
  .btn-next {
    background-color: $white_color !important;
    min-width: 40px !important;
    height: 35px;
    span {
      min-width: 40px !important;
    }
  }
  .el-pager {
    background-color: $white_color !important;
    li {
      background-color: $white_color !important;
      min-width: 35px !important;
      height: 35px;
      line-height: 35px;
      border: 1px $white_color solid;
      &:hover {
        line-height: 35px;
        cursor: pointer;
      }
    }
    .btn-quicknext,
    .btn-quickprev {
      line-height: 35px;
    }
  }
}
</style>
